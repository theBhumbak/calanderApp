import {useForm} from '../../hooks/useFrom';
import {IconedInput, Select} from '../../components/inputs';
import {TextInput} from 'react-native-gesture-handler';
import {Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import {s} from 'react-native-size-matters';
import {DatePicker} from '../../components/inputs/datePicker';
import {EditIcon, TrashIcon} from '../../assets/svg';
import {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {taskActions} from '../../store/slices/taskSlice';

export const TaskDetail = ({route = {}}) => {
  const {
    startDate,
    title = '',
    endDate,
    description = '',
    category = 'Health',
    type = '',
    ...restEvent
  } = route?.params || {};
  const {goBack} = useNavigation();
  const dispatch = useDispatch();
  const {id} = restEvent;
  const modes = {
    edit: 'edit',
    create: 'create',
    view: 'view',
  };
  const modesHeadingMap = {
    edit: 'Edit Task',
    create: 'Add Task',
    view: 'Task View',
  };
  const [mode, setMode] = useState(id ? 'view' : 'create');
  const editable = mode !== modes.view;
  const {onChangeValue, onSubmit, onUpdate, onDelete, formState, setFromState} =
    useForm({
      defaultValues: {
        startDate: startDate
          ? typeof startDate == 'string'
            ? moment(startDate).toDate()
            : startDate
          : new Date(),
        title: title,
        endDate: endDate
          ? typeof endDate == 'string'
            ? moment(endDate).toDate()
            : endDate
          : moment(startDate).add(1, 'h').toDate(),
        category,
        description,
        ...restEvent,
      },
    });

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setFromState({
        startDate: startDate
          ? typeof startDate == 'string'
            ? moment(startDate).toDate()
            : startDate
          : new Date(),
        title: title,
        endDate: endDate
          ? typeof endDate == 'string'
            ? moment(endDate).toDate()
            : endDate
          : moment(startDate).add(1, 'h').toDate(),
        category,
        description,
        ...restEvent,
      });
      setMode(id ? 'view' : 'create');
    } else {
      setFromState({
        startDate: new Date(),
        title: '',
        endDate: moment(new Date()).add(1, 'h').toDate(),
        category: 'Health',
        description: '',
      });
    }
    console.log('>>>>> isFocused', {isFocused, mode});
  }, [isFocused]);
  return (
    <View style={{flex: 1, margin: 20, justifyContent: 'space-between'}}>
      <View style={{}}>
        <View style={{height: s(20), alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>{modesHeadingMap[mode]}</Text>
        </View>
        <IconedInput icon={<Text>1</Text>}>
          <TextInput
            editable={editable}
            style={{height: 40}}
            value={formState.title}
            placeholder="Title"
            onChangeText={value => {
              onChangeValue({
                field: 'title',
                value,
              });
            }}
          />
        </IconedInput>
        <IconedInput icon={<Text>2</Text>}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 8,
            }}>
            <DatePicker
              value={formState.startDate}
              mode="date"
              onChangeValue={value => {
                let endDate = new Date(formState?.endDate);
                endDate.setDate(value.getDate());
                endDate.setMonth(value.getMonth());
                endDate.setFullYear(value.getFullYear());
                onChangeValue({
                  values: {
                    startDate: value,
                    endDate,
                  },
                });
              }}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <DatePicker
                mode="time"
                value={formState.startDate}
                onChangeValue={value => {
                  onChangeValue({field: 'startDate', value});
                }}
              />
              <DatePicker
                mode="time"
                value={formState.endDate}
                onChangeValue={value => {
                  onChangeValue({field: 'endDate', value});
                }}
              />
            </View>
          </View>
        </IconedInput>

        <IconedInput icon={<Text>3</Text>}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            <Text>Select category</Text>
            <Select
              editable={editable}
              onChangeValue={value => {
                onChangeValue({field: 'category', value});
              }}
              value={formState.category}
            />
          </View>
        </IconedInput>
        <IconedInput icon={<Text>4</Text>}>
          <TextInput
            editable={editable}
            style={{height: 40}}
            value={formState.description}
            placeholder="Description"
            onChangeText={value => {
              onChangeValue({
                field: 'description',
                value,
              });
            }}
          />
        </IconedInput>
      </View>
      <View>
        {mode === modes.view && (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => onDelete(id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: s(5),
                gap: s(5),
              }}>
              <TrashIcon height={s(24)} width={s(24)} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setMode(modes.edit);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: s(5),
                gap: s(5),
              }}>
              <EditIcon height={s(24)} width={s(24)} />
            </TouchableOpacity>
          </View>
        )}
        {mode !== modes.view && (
          <TouchableOpacity
            onPress={mode === modes.create ? onSubmit : () => onUpdate(id)}
            style={{
              paddingVertical: s(15),
              backgroundColor: 'lightblue',
              borderRadius: s(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{mode === modes.create ? 'Save' : 'Update'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
