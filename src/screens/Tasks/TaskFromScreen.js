import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {taskActions} from '../../store/slices/taskSlice';
import taskService from '../../services/taskService';

const TaskFromScreen = () => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const fetchTasks = async () => {
    try {
      const response = await taskService.getTasks();
      console.log('>>>> response', response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    dispatch(taskActions.fetchTasks());
    
  }, []);
  return (
    <View style={{flex: 1}}>
      <TextInput
        placeholder="Title*"
        style={{height: scale(30), backgroundColor: 'red'}}
      />
      <Text>{''}</Text>
    </View>
  );
};

export default TaskFromScreen;

const styles = StyleSheet.create({});
