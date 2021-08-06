import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import MapIcon from '../assets/icons/map.svg';

export default function Suggestion(props: any) {
  type dataType = {id: string; title: string}[];
  const DATA: dataType = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Dakar, Sénégal',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Tokyo, Japan',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Paris, France',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91arra97f63',
      title: 'London, England',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571edf29d72',
      title: 'Frankfurt, Germany',
    },
  ];
  //   const Item = ({ title }) => (
  //     <View >
  //       <Text >{title}</Text>
  //     </View>
  //   );

  type itemType = {item: {title: string; id: string}};
  const renderItem = ({item}: itemType) => (
      <View style={props.style.itemContainer}>
        <TouchableOpacity>
        <View style={props.style.iconAndTextContainer}>
          <View style={props.style.locationIconContainer}>
            <MapIcon
              width={props.svgParams.mapIconSvg.width}
              height={props.svgParams.mapIconSvg.height}
              fill={props.svgParams.mapIconSvg.fill}
            />
          </View>
          <Text style={props.style.suggestionText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
        <View style={props.style.separator}></View>
    </View>
  );

  return (
    <View style={props.style.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* <View style={props.style.itemContainer}>
        <View style={props.style.iconAndTextContainer}>
          <View style={props.style.locationIconContainer}>
            <MapIcon
              width={props.svgParams.mapIconSvg.width}
              height={props.svgParams.mapIconSvg.height}
              fill={props.svgParams.mapIconSvg.fill}
            />
          </View>
          <Text style={props.style.suggestionText}>Paris, France</Text>
        </View>
        <View style={props.style.separator}></View>
      </View>

      <View style={props.style.itemContainer}>
        <View style={props.style.iconAndTextContainer}>
          <View style={props.style.locationIconContainer}>
            <MapIcon
              width={props.svgParams.mapIconSvg.width}
              height={props.svgParams.mapIconSvg.height}
              fill={props.svgParams.mapIconSvg.fill}
            />
          </View>
          <Text style={props.style.suggestionText}>Dakar, Sénégal</Text>
        </View>
        <View style={props.style.separator}></View>
      </View>

      <View style={props.style.itemContainer}>
        <View style={props.style.iconAndTextContainer}>
          <View style={props.style.locationIconContainer}>
            <MapIcon
              width={props.svgParams.mapIconSvg.width}
              height={props.svgParams.mapIconSvg.height}
              fill={props.svgParams.mapIconSvg.fill}
            />
          </View>
          <Text style={props.style.suggestionText}>Tokyo, Japan</Text>
        </View>
        <View style={props.style.separator}></View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({});
