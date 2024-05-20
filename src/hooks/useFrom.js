import {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {taskActions} from '../store/slices/taskSlice';
import {useNavigation} from '@react-navigation/native';

export const useForm = ({api, defaultValues = {}}) => {
  const [state, setState] = useState(defaultValues);
  const dispatch = useDispatch();
  const {goBack} = useNavigation();
  const onChangeValue = useCallback(
    ({field, value, values}) => {
      if (values && Object.keys(values).length) {
        setState({
          ...state,
          ...values,
        });
      } else {
        setState({
          ...state,
          [field]: value,
        });
      }
    },
    [state],
  );
  const onSubmit = useCallback(() => {
    dispatch(taskActions.createTask(state));
    setTimeout(() => {
      dispatch(taskActions.fetchTasks());
    }, 10);
    goBack();
  }, [state, api]);
  const onUpdate = useCallback(
    id => {
      dispatch(taskActions.updateTask({id, taskData: state}));
      setTimeout(() => {
        dispatch(taskActions.fetchTasks());
      }, 10);
      goBack();
    },
    [state, api],
  );
  const onDelete = useCallback(
    id => {
      dispatch(taskActions.deleteTask(id));
      setTimeout(() => {
        dispatch(taskActions.fetchTasks());
      }, 300);
      setTimeout(() => {
        goBack();
      }, 500);
    },
    [state, api],
  );

  const setFromState = _state => {
    setState(_state);
  };
  return {
    onChangeValue,
    onSubmit,
    onUpdate,
    onDelete,
    formState: state,
    setFromState,
  };
};
