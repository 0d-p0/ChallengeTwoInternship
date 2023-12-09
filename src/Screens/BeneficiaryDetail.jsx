import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {MyColors} from '../res/Color';
import CustomButton from '../Components/CustomButton';
import GetBeneficiaryDetails from '../hooks/GetBeneficiaryDetails';

const borderRadius = 30;

const BeneficiaryDetail = ({route, navigation}) => {
  const {itemId} = route.params;
  const {beneficiaryDetails, error, loading} = GetBeneficiaryDetails(itemId);
  const [picture, setPicture] = useState();

  const {
    id,
    status,
    first_name,
    last_name,
    email,
    mobile,
    uploaded_by_data,
    dob,
    gender,
    marital_status,
    modified_on,
    beneficiary_amputation_cause_name,
    beneficiary_amputation_type_name,
    beneficiary_amputation_side_name,
    verified_by,
  } = beneficiaryDetails || {};

  const date = new Date(modified_on);

  const pickImage = async () => {
    const result = await launchImageLibrary();
    setPicture(result.assets?.[0]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.greenContainer} />
      {/* Header Components */}
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()} style={styles.header}>
          {/* Back Icon which does nothing */}
          <Ionicons
            name="chevron-back-outline"
            size={30}
            color="white"
            style={{paddingRight: 10}}
          />
          <View>
            {/* Screen Title */}
            <Text style={styles.titleMain}>Beneficiary Details</Text>
            <Text style={styles.titleSecondary}>Apps/Beneficiary/Details</Text>
          </View>
        </Pressable>
        <Feather
          name="more-vertical"
          size={30}
          color="white"
          style={{paddingRight: 10}}
        />
      </View>

      {/* Beneficiary Details */}
      <View style={styles.beneficiaryContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Paitient details
          
          Photo, name, Phone Number, Email, Address
          
           */}
          <View style={{...styles.cardContainer, paddingVertical: 0}}>
            <View style={styles.beneficiarySectionOne}>
              {/* section 1 
                id, Verified tag
            */}
              <Text style={{color: 'grey', fontWeight: '400', fontSize: 16}}>
                {id}
              </Text>
              <Text style={{color: 'grey', fontWeight: '400', fontSize: 16}}>
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

              <View style={{alignSelf: 'center'}}>
                <Image
                  source={{
                    uri: picture
                      ? picture.uri
                      : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                  }}
                  style={{
                    height: 100,
                    width: 100,
                    backgroundColor: 'grey',
                    borderRadius: 50,
                  }}
                />

                <Pressable
                  onPress={pickImage}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    alignSelf: 'center',
                    backgroundColor: MyColors.primary,
                    borderRadius: 50,
                    padding: 5,
                  }}>
                  <Feather name="camera" size={20} color={'white'} />
                </Pressable>
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  gap: 10,
                }}>
                <Text style={{color: 'black', fontWeight: '600', fontSize: 22}}>
                  {first_name + ' ' + last_name}
                </Text>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Entypo name="phone" size={20} color={'orange'} />
                  <Text
                    style={{color: 'grey', fontWeight: '500', fontSize: 16}}>
                    {mobile}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', gap: 10, paddingRight: 5}}>
                  <Octicons name="location" size={20} color={'orange'} />
                  <Text
                    ellipsizeMode="tail"
                    style={{
                      color: 'grey',
                      fontWeight: '500',
                      fontSize: 16,
                      flex: 1,
                    }}>
                    {uploaded_by_data?.address_data}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={'orange'}
                  />
                  <Text
                    style={{
                      color: 'grey',
                      fontWeight: '500',
                      fontSize: 16,
                      flex: 1,
                    }}>
                    {email}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* 

            List of Button

          
           */}
          <View
            style={{
              ...styles.cardContainer,
              gap: 10,
            }}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <View style={{flex: 1}}>
                <CustomButton title={'Uploads'} />
              </View>
              <View style={{flex: 1}}>
                <CustomButton title={'Appointsments'} />
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <View style={{flex: 1}}>
                <CustomButton title={'Notes'} />
              </View>
              <View style={{flex: 1}}>
                <CustomButton title={'Fitment details'} />
              </View>
            </View>
          </View>

          {/* Paitient More details
          
          DOB, Addhar Number, gender, married status, Address, 
          Amputation Date, case, Type, Side
           
           */}

          <View style={styles.cardContainer}>
            {/*  DOB,  gender, married status  */}
            <View style={styles.beneficiarySectionThree}>
              {/* section 3 
              DOB, Gender, married Status
            */}
              <Text style={{color: 'orange', fontWeight: '500', fontSize: 16}}>
                DOB
              </Text>
              <Text style={{color: 'grey', fontWeight: '500', fontSize: 16}}>
                {dob}
              </Text>
              <View
                style={{...styles.verticalDivider, backgroundColor: 'black'}}
              />
              <Text style={{color: 'grey', fontWeight: '500', fontSize: 16}}>
                {gender}
              </Text>
              <View
                style={{...styles.verticalDivider, backgroundColor: 'black'}}
              />
              <Text style={{color: 'grey', fontWeight: '500', fontSize: 16}}>
                {marital_status}
              </Text>
            </View>
            {/* Horizonatal Divider */}
            <View style={styles.horizontalDivider} />
            {/* Aadhar Number */}
            {/* <View style={{flexDirection: 'row', gap: 10}}>
              <Text
                style={{
                  color: 'orange',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                Aadhar Number
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                909090909090
              </Text>
            </View> */}
            {/* Address */}
            <View>
              <Text style={{color: 'orange', fontWeight: '500', fontSize: 16}}>
                Address
              </Text>
              <Text style={{color: 'grey', fontWeight: '500', fontSize: 16}}>
                {uploaded_by_data?.address_data}
              </Text>
            </View>
            {/* Horizonatal Divider */}
            <View style={styles.horizontalDivider} />

            {/* Date of amputation */}
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text
                style={{
                  color: 'orange',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                Date of amputation
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                {date.toLocaleDateString()}
              </Text>
            </View>

            {/* amputation  cause*/}
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text
                style={{
                  color: 'orange',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                Amputation cause
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                {beneficiary_amputation_cause_name}
              </Text>
            </View>

            {/* amputation  type*/}
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text
                style={{
                  color: 'orange',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                Amputation Type
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                {beneficiary_amputation_type_name}
              </Text>
            </View>

            {/* amputation  side*/}
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text
                style={{
                  color: 'orange',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                Amputation Side
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                {beneficiary_amputation_side_name}
              </Text>
            </View>
          </View>

          {/* 
          
          More Info - Lead id, Lead collection id, Uploaded by, Verified by
        
           */}

          <View style={styles.cardContainer}>
            {/* title */}
            <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
              More Info
            </Text>

            {/* Horizonatal Divider */}
            <View style={styles.horizontalDivider} />

            {/* Lead id */}
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text
                style={{
                  color: 'orange',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                Lead ID
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                {`${verified_by?.id}`}
              </Text>
            </View>
            {/* Lead Collection Id */}
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text
                style={{
                  color: 'orange',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                Lead Collection Id
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                {`${uploaded_by_data?.id}`}
              </Text>
            </View>

            {/*  Uploaded by  */}
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text
                style={{
                  color: 'orange',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                Uploaded by
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                {`${uploaded_by_data?.first_name} ${uploaded_by_data?.last_name}`}
              </Text>
            </View>

            {/* Verified by */}
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text
                style={{
                  color: 'orange',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                Verified by
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontWeight: '500',
                  fontSize: 14,
                  flex: 1,
                }}>
                {`${verified_by?.first_name} ${verified_by?.last_name}`}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default BeneficiaryDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greenContainer: {
    backgroundColor: MyColors.primary,
    height: 350,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    paddingHorizontal: 15,
    paddingTop: 15,
    position: 'absolute',
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
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

  beneficiaryContainer: {
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 90,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
    padding: 20,
    marginBottom: 10,
  },

  beneficiarySectionOne: {
    paddingTop: 15,
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
    marginVertical: 10,
    width: '100%',
    height: 1,
    backgroundColor: 'grey',
  },
});
