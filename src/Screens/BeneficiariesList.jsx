import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  PixelRatio,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';

import {MyColors} from '../res/Color';
import GetAllBeneficiaryList from '../hooks/GetAllBeneficiaryList';

const borderRadius = 30;

const BeneficiariesList = ({navigation}) => {
  const {loading, beneficiaries, error} = GetAllBeneficiaryList();
  const [text, onChangeText] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.greenContainer} />

      <View style={styles.headerContainer}>
        <View style={styles.header}>
          {/* Back Icon which does nothing */}
          <Ionicons
            name="chevron-back-outline"
            size={30}
            color="white"
            style={{paddingRight: 10}}
          />
          <View>
            {/* Screen Title */}
            <Text style={styles.titleMain}>Beneficiary</Text>
            <Text style={styles.titleSecondary}>Apps/Beneficiary</Text>
          </View>
        </View>
        {/* Search Component */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons
              name="search-sharp"
              size={25}
              color={MyColors.primary}
              style={{paddingRight: 10}}
            />
            {/* <TextInput style={styles.searchInput}>Test Patient</TextInput> */}
            <TextInput
              placeholderTextColor={'black'}
              style={styles.searchInput}
              onChangeText={onChangeText}
              value={text}
              placeholder="Search"
            />
          </View>

          <View style={styles.verticalDivider} />

          <View style={styles.filterContainer}>
            <Text style={styles.searchInput}>Filter</Text>
            <Ionicons
              name="filter-sharp"
              size={25}
              color={MyColors.primary}
              style={{paddingRight: 10}}
            />
          </View>
        </View>
        <View style={styles.horizontalDivider} />
      </View>
      {/* Beneficiary lists */}
      <View style={styles.beneficiaryContainer}>
        {error.isError && (
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,

              alignItems: 'center',
            }}>
            <Text style={{color: 'red', fontSize: 18, fontWeight: '500'}}>
              {error.message}
            </Text>
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          {beneficiaries &&
            beneficiaries.map((props, index) => {
              const {
                id,
                first_name,
                last_name,
                status,
                dob,
                gender,
                marital_status,
                mobile,
                uploaded_by_data,
              } = props || {};
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate('BeneficiaryDetail', {
                      itemId: id,
                    });
                  }}
                  style={styles.beneficiary}
                  key={index}>
                  <View style={styles.beneficiarySectionOne}>
                    {/* section 1 
                id, Verified tag
            */}
                    <Text
                      style={{
                        color: 'grey',
                        fontWeight: '400',
                        fontSize: 16,
                      }}>
                      {id}
                    </Text>
                    <Text
                      style={{
                        color: 'grey',
                        fontWeight: '400',
                        fontSize: 16,
                      }}>
                      {status}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.horizontalDivider,
                      backgroundColor: 'grey',
                      marginVertical: 1,
                    }}
                  />
                  <View style={styles.beneficiarySectionTwo}>
                    {/* section 2
               photo, name, phone number, address
             */}

                    <Image
                      source={{
                        uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                      }}
                      style={{
                        height: 100,
                        width: 100,
                        backgroundColor: 'grey',
                        borderRadius: 50,
                        alignSelf: 'center',
                      }}
                    />

                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontWeight: '600',
                          fontSize: 22,
                        }}>
                        {`${first_name} ${last_name}`}
                      </Text>
                      <View style={{flexDirection: 'row', gap: 10}}>
                        <Entypo name="phone" size={20} color={'orange'} />
                        <Text
                          style={{
                            color: 'grey',
                            fontWeight: '500',
                            fontSize: 16,
                          }}>
                          {mobile}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row', gap: 10}}>
                        <Octicons name="location" size={20} color={'orange'} />
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={{
                            color: 'grey',
                            fontWeight: '500',
                            fontSize: 16,
                            flex: 1,
                          }}>
                          {uploaded_by_data?.address_data}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.beneficiarySectionThree}>
                    {/* section 3 
              DOB, Gender, married Status
            */}
                    <Text
                      style={{
                        color: 'orange',
                        fontWeight: '500',
                        fontSize: 16,
                      }}>
                      DOB
                    </Text>
                    <Text
                      style={{
                        color: 'grey',
                        fontWeight: '500',
                        fontSize: 16,
                      }}>
                      {dob}
                    </Text>
                    <View
                      style={{
                        ...styles.verticalDivider,
                        backgroundColor: 'black',
                      }}
                    />
                    <Text
                      style={{
                        color: 'grey',
                        fontWeight: '500',
                        fontSize: 16,
                      }}>
                      {gender}
                    </Text>
                    <View
                      style={{
                        ...styles.verticalDivider,
                        backgroundColor: 'black',
                      }}
                    />
                    <Text
                      style={{
                        color: 'grey',
                        fontWeight: '500',
                        fontSize: 16,
                      }}>
                      {marital_status}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export default BeneficiariesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greenContainer: {
    backgroundColor: MyColors.primary,
    height: 200,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    position: 'absolute',
    width: '100%',
  },
  headerContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleMain: {
    fontSize: PixelRatio.roundToNearestPixel(20),
    color: 'white',
    fontWeight: '400',
  },
  titleSecondary: {
    fontSize: PixelRatio.roundToNearestPixel(14),
    color: 'white',
    fontWeight: '400',
    opacity: 0.7,
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchInput: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
    paddingVertical: -10,
    maxWidth: '80%',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 10,
    padding: 10,
  },

  beneficiaryContainer: {
    paddingHorizontal: 10,
    marginBottom: 180,
  },
  beneficiary: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
    padding: 20,
    marginBottom: 10,
  },

  beneficiarySectionOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  beneficiarySectionTwo: {
    flexDirection: 'row',
    gap: 15,
    marginVertical: 10,
  },
  beneficiarySectionThree: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalDivider: {
    height: '100%',
    width: 2,
    backgroundColor: MyColors.primary,
  },

  horizontalDivider: {
    marginVertical: 20,
    width: '100%',
    height: 1,
    backgroundColor: 'white',
  },
});
