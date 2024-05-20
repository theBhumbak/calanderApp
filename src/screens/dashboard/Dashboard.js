import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DateTimeGrid} from '../../components/dateTimeGrid';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export const Dashboard = ({route}) => {
  const {daysInView} = route.params;
  const tasks = [
    {
      completed: false,
      id: 4,
      title: 'Task 4',
      description: 'sjkdjkshadkjhskjd sajkdkjashdkjas sakjdhjaskhdkajsdkjh',
      startDate: '2024-05-20T14:17:40.896Z',
      endDate: '2024-05-20T15:18:40.896Z',
      category: 'Health',
      updatedAt: '2024-05-20T14:15:40.896Z',
      createdAt: '2024-05-20T14:15:40.896Z',
    },
  ];

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <DateTimeGrid daysInView={daysInView} tasks={tasks} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
