import React, {useState} from 'react';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
import {Modal, Platform, Text, TouchableOpacity} from 'react-native';

const getDate = date => {
  if (!date) {
    let now = new Date();
    return now;
  }
  return date;
};

export const DatePicker = ({mode, value, onChangeValue}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const datePicked = (e, value) => {
    onChangeValue && onChangeValue(value);
  };

  const onChangeDate = (e, selectedDate) => {
    if (e.type === 'dismissed') {
    } else if (selectedDate !== undefined) {
      datePicked(e, selectedDate);
    }

    if (Platform.OS === 'ios') {
      setModalVisible(false);
    }
  };

  const onPressDate = () => {
    if (Platform.OS === 'ios') {
      setModalVisible(true);
    } else {
      DateTimePickerAndroid.open({
        value: getDate(value),
        mode,
        display: 'default',
        onChange: onChangeDate,
      });
    }
  };
  const parseTime = value => moment(value).format('hh : mm A');

  const formattedValue =
    mode === 'date' ? moment(value).format('DD MMM YY') : parseTime(value);
  return (
    <>
      <TouchableOpacity
        onPress={onPressDate}
        style={{backgroundColor: '#f3f3f3', padding: 4, borderRadius: 4}}>
        <Text>{formattedValue}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: '#00000077',
          }}
          activeOpacity={1}
          onPress={() => {
            setModalVisible(false);
          }}>
          <DateTimePicker
            value={getDate(value)}
            mode={mode}
            display={mode === 'date' ? 'inline' : 'spinner'}
            onChange={onChangeDate}
            style={{
              backgroundColor: 'white',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          />
        </TouchableOpacity>
      </Modal>
    </>
  );
};
