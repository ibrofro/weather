import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import MapIcon from '../assets/icons/map.svg';
import countriesJsonFile from '../node_modules/worldcities/data/countries.json';
import citiesJsonFile from '../node_modules/worldcities/data/cities.json';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import * as enums from '../enums';
export default function Suggestion(props: {
  style: any;
  svgParams: any;
  searchString: string | null;
}) {
  type countryAndRelatedCitiesType = [
    {
      country: string;
      cities: {name: string; lat: number; lon: number; index: number}[];
    },
  ];

  type cityType = {
    name: string;
    continent: string;
    lat: number;
    lon: number;
    index: number;
  }[];
  type countryType = {countryCode: string; name: string};
  const navigation = useNavigation();

  const [countryAndRelatedCities, setCountryAndRelatedCities] =
    useState<null | countryAndRelatedCitiesType>(null);
  const [noResult, setNoResult] = useState<boolean>(false);
  const loadingStatus = useRef<boolean>(true);
  const [cities, setCities] = useState<null | cityType>(null);
  const [countryFound, setCountryFound] = useState<countryType | null>(null);

  const findCities = (country: countryType): countryAndRelatedCitiesType => {
    let index = 0;
    const cities = [];
    const countryCode = country.countryCode;
    const countryName = country.name;
    for (let i = 0; i < citiesJsonFile.length; i++) {
      if (citiesJsonFile[i][3] === countryCode) {
        cities.push({
          name: citiesJsonFile[i][2],
          lat: citiesJsonFile[i][0],
          lon: citiesJsonFile[i][1],
          index: index,
        });
        index++;
      }
    }
    return [
      {
        country: countryName,
        cities: cities.sort((a, b): number => {
          const first = a.name.toLocaleLowerCase().charCodeAt(0);
          const second = b.name.toLocaleLowerCase().charCodeAt(0);
          if (first < second) {
            return -1;
          } else if (first > second) {
            return 1;
          }
          return 0;
        }),
      },
    ];
  };

  const findCountry = (countryInput: string | null): null | countryType => {
    if (!countryInput) {
      return null;
    }
    countryInput = countryInput.trim();
    for (let i = 0; i < countriesJsonFile.length; i++) {
      if (countriesJsonFile[i][2] === countryInput) {
        let countryName = countriesJsonFile[i][2];

        // Found cities related to this country
        const countryCode = countriesJsonFile[i][0];
        countriesJsonFile.length = countriesJsonFile.length - 1;
        return {countryCode: countryCode, name: countryName};
      }
    }
    return null;
  };

  const findCity = (city: string | null): null | cityType => {
    if (!city) {
      return null;
    }
    const citiesFounded = [];
    let index = 0;
    for (let i = 0; i < citiesJsonFile.length; i++) {
      if (citiesJsonFile[i][2] === city) {
        let duplication = false;
        for (let p = 0; p < citiesFounded.length; p++) {
          console.log(citiesFounded[p].continent);
          console.log(citiesJsonFile[i][5].split('/')[0]);
          if (
            citiesJsonFile[i][5].split('/')[0] === citiesFounded[p].continent
          ) {
            duplication = true;
          }
        }
        if (duplication === false) {
          console.log('Founded ' + citiesJsonFile[i]);
          citiesFounded.push({
            name: citiesJsonFile[i][2],
            continent: citiesJsonFile[i][5].split('/')[0],
            lat: citiesJsonFile[i][0],
            lon: citiesJsonFile[i][1],
            index: index,
          });
          index++;
        }
      }
    }

    const result = citiesFounded.length > 0 ? citiesFounded : null;

    return result as cityType;
  };

  function sanitizeForSearch(params: string | null): string | null {
    if (!params) {
      return null;
    }
    let newStr = params.replace(/\s/g, '-');
    let anStr = newStr.match(/-[a-z]/g);
    if (anStr && anStr.length > 0) {
      let last = [newStr];
      for (let i = 0; i < anStr.length; i++) {
        last.push(
          last[last.length - 1].replace(anStr[i], anStr[i].toUpperCase()),
        );
        // console.log(last)
      }
      return last[last.length - 1];
    } else {
      return params;
    }
  }

  function turnFirstToUppercase(params: string | null): string | null {
    if (params) {
      const firstChar = params.charAt(0).toUpperCase();
      const rest = params.slice(1);
      return firstChar + rest;
    } else {
      return null;
    }
  }

  type itemCityType = {
    item: {
      name: string;
      continent: string;
      lat: number;
      lon: number;
      index: number;
    };
  };
  const renderCities = ({item}: itemCityType) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SearchResultScreen', {
            lon: item.lon,
            lat: item.lat,
          });
        }}>
        <View style={props.style.itemContainer}>
          <View style={props.style.iconAndTextContainer}>
            <View style={props.style.locationIconContainer}>
              <MapIcon
                width={props.svgParams.mapIconSvg.width}
                height={props.svgParams.mapIconSvg.height}
                fill={props.svgParams.mapIconSvg.fill}
              />
            </View>
            <Text style={props.style.suggestionText}>
              {item.name}/{item.continent}
            </Text>
          </View>
          <View style={props.style.separator}></View>
        </View>
      </TouchableOpacity>
    </View>
  );


  useEffect(() => {
    setCountryAndRelatedCities(null);
    setCities(null);
    let sanitized = sanitizeForSearch(props.searchString);
    console.log(turnFirstToUppercase(sanitized));
    const cities = findCity(turnFirstToUppercase(sanitized));
    if (cities) {
      setCities(cities);
    } else {
      setCities(null);
    }
  }, [props.searchString]);

  return (
    <View>
      {cities !== null ? (
        <View style={props.style.container}>
          <FlatList
            data={cities}
            renderItem={renderCities}
            initialNumToRender={7}
            keyExtractor={i => i.index.toString()}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
