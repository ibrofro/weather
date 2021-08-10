import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import MapIcon from '../assets/icons/map.svg';
import countriesJsonFile from '../node_modules/worldcities/data/countries.json';
import citiesJsonFile from '../node_modules/worldcities/data/cities.json';

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

  const [countryAndRelatedCities, setCountryAndRelatedCities] =
    useState<null | countryAndRelatedCitiesType>(null);

  const [cities, setCities] = useState<null | cityType>(null);

  const findCountryAndRelatedCities = (
    countryInput: string | null,
  ): null | countryAndRelatedCitiesType => {
    if (!countryInput) {
      return null;
    }

    let countryFound;
    const cities = [];
    for (let i = 0; i < countriesJsonFile.length; i++) {
      if (countriesJsonFile[i][2] === countryInput) {
        countryFound = countriesJsonFile[i][2];

        // Found cities related to this country
        const countryCode = countriesJsonFile[i][0];
        console.log('countryCode ' + countriesJsonFile[i][0]);
        let index = 0;
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

        i = countriesJsonFile.length - 1;
        return [
          {
            country: countryFound,
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
    console.log('city not founded');
    const result = citiesFounded.length > 0 ? citiesFounded : null;

    return result as cityType;
  };
  type itemType = {
    item: {
      country: string;
      cities: {
        name: string;
        lat: number;
        lon: number;
        index: number;
      }[];
    };
  };
  const renderCountryAndRelatedCities = ({item}: itemType) => (
    <View style={props.style.itemContainer}>
      <Text style={props.style.countryText}>{item.country}</Text>

      {item.cities.map((element, index) => {
        return (
          <TouchableOpacity key={element.index}>
            <View style={props.style.iconAndTextContainer}>
              <View style={props.style.locationIconContainer}>
                <MapIcon
                  width={props.svgParams.mapIconSvg.width}
                  height={props.svgParams.mapIconSvg.height}
                  fill={props.svgParams.mapIconSvg.fill}
                />
              </View>
              <View style={props.style.suggestionContainer}>
                <Text style={props.style.suggestionText}>{element.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}

      <View style={props.style.separator}></View>
    </View>
  );

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
    <TouchableOpacity>
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
  );

  useEffect(() => {
    setCountryAndRelatedCities(null);
    setCities(null);
    const countryAndRelatedCitiesFound = findCountryAndRelatedCities(
      props.searchString,
    );
    if (countryAndRelatedCitiesFound) {
      console.log('countriesAndRelatedCitiesState');
      console.log(JSON.stringify(countryAndRelatedCities));
      setCountryAndRelatedCities(countryAndRelatedCitiesFound);
    } else {
      console.log('No country .. try city search');
      const citiesFound = findCity(props.searchString);
      if (citiesFound) {
        console.log('cities found');
        console.log(JSON.stringify(citiesFound));
        setCities(citiesFound);
      }
    }
    return () => {
      // Reset cities suggestion
    };
  }, [props.searchString]);

  return (
    <View style={props.style.container}>
      {countryAndRelatedCities !== null ? (
        <FlatList
          data={countryAndRelatedCities}
          renderItem={renderCountryAndRelatedCities}
          keyExtractor={index => 'only-one'}
        />
      ) : null}

      {cities !== null ? (
        <FlatList
          data={cities}
          renderItem={renderCities}
          initialNumToRender={7}
          keyExtractor={i => i.index.toString()}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
