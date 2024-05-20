import {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {taskActions} from '../store/slices/taskSlice';

export const useForm = ({api, defaultValues = {}}) => {
  const [state, setState] = useState(defaultValues);
  const dispatch = useDispatch();
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
    const id = !true ? 2 : '';
    if (id) {
      dispatch(taskActions.deleteTask(id));
      // dispatch(taskActions.updateTask({id, taskData: {...state, id}}));
    } else {
      dispatch(taskActions.createTask(state));
    }
  }, [state, api]);
  console.log('state>>>>>', state);
  return {
    onChangeValue,
    onSubmit,
    formState: state,
  };
};
