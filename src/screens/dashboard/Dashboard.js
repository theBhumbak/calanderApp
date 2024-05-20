import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {DateTimeGrid} from '../../components/dateTimeGrid';
import {useDispatch, useSelector} from 'react-redux';
import {taskActions} from '../../store/slices/taskSlice';
export const Dashboard = ({route}) => {
  const {daysInView} = route.params;
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(taskActions.fetchTasks());
  }, []);
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
