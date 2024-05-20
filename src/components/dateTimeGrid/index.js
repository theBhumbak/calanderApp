import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {s, vs, ms, mvs, scale} from 'react-native-size-matters';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {routeNames} from '../../navigation/routeNames';
import {dummyDataDTG} from './dummyDataDTG';

const getPostionAndHeightForEvent = (event = {}, slabHeight) => {
  const {startTime = '', endTime = '', startDate, endDate} = event;
  let startPos = 0;
  let eventSectionHeight = 2;
  const heightPerHour = slabHeight;
  const heightPerMin = slabHeight / 60;

  if (startTime) {
    const [startHour, startMin] = startTime.split(':');
    const [endHour, endMin] = endTime.split(':');
    startPos = startHour * heightPerHour + startMin * heightPerMin;
    const DurationInHours = endHour - startHour;
    const DurationInMin = endMin - startMin;
    eventSectionHeight =
      DurationInHours * heightPerHour + DurationInMin * heightPerMin;
  } else if (startDate) {
    const startHour = moment(startDate).hours();
    const startMin = moment(startDate).minutes();

    startPos = startHour * heightPerHour + startMin * heightPerMin;
    const DurationInHours = moment(endDate).diff(moment(startDate), 'h');
    const DurationInMin = moment(event.endDate).diff(moment(startDate), 'm');
    eventSectionHeight =
      DurationInHours * heightPerHour + DurationInMin * heightPerMin;
  }
  return [startPos, eventSectionHeight];
};
const categoryColorMap = {
  Health: 'green',
  Office: 'orange',
  Home: 'blue',
};
const getDateWithTimeFromHourSlab = (day, timeStr) => {
  const now = new Date();

  // Get the current year and month
  const year = now.getFullYear();
  const month = now.getMonth(); // Note: getMonth() returns month index (0-11)

  // Parse the time string (e.g., "4 PM")
  const timeParts = timeStr.match(/(\d+):?(\d*)\s*(AM|PM)/i);
  if (!timeParts) {
    throw new Error('Invalid time format');
  }

  let hour = parseInt(timeParts[1], 10);
  const minute = timeParts[2] ? parseInt(timeParts[2], 10) : 0;
  const period = timeParts[3].toUpperCase();

  if (period === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period === 'AM' && hour === 12) {
    hour = 0;
  }

  // Create a new date object for the specified day and time
  const date = new Date(year, month, day, hour, minute);
  return date;
};
export const HourSlab = ({hour, height = 50, index = false, date, time}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(routeNames.AddTask, {
          startDate: getDateWithTimeFromHourSlab(date, hour.labelAM),
          type: 'create',
        });
      }}
      style={{
        height: vs(height),
        ...{
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderColor: 'lightgray',
        },
        backgroundColor: 'white',
      }}>
      {index && (
        <View
          style={{
            position: 'relative',
            top: -15,
            justifyContent: 'center',
            alignItems: 'left',
            height: 30,
            backgroundColor: 'white',
            width: 50,
          }}>
          <Text style={{paddingLeft: 5}}>{hour.labelAM}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
const slabHeight = 50;
export const TimeLineColumnBackground = ({
  width,
  hours = [],
  index = false,
  events = [],
  date = '',
  ...rest
}) => {
  const navigation = useNavigation();
  return (
    <View style={{position: 'relative'}}>
      <View
        style={{
          ...(width ? {width: scale(width)} : {flex: 1}),
        }}>
        {hours.map((hour, i) => {
          return (
            <HourSlab
              key={hour.id}
              hour={hour}
              index={index}
              date={date}
              time={hours}
              height={slabHeight}
            />
          );
        })}
      </View>
      {events.map((event, index) => {
        const [topPostion, height] = getPostionAndHeightForEvent(
          event,
          slabHeight,
        );
        const {category, title = 'title'} = event;
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routeNames.AddTask, {
                ...event,
                type: 'edit',
              });
            }}
            key={index}
            style={{
              position: 'absolute',
              backgroundColor: categoryColorMap[category],
              width: scale(width) - 1,
              top: vs(topPostion),
              height: vs(height),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{title || ''}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const hours = [
  {id: 0, labelAM: '', label: '0'},
  {id: 1, labelAM: '1 AM', label: '1'},
  {id: 2, labelAM: '2 AM', label: '2'},
  {id: 3, labelAM: '3 AM', label: '3'},
  {id: 4, labelAM: '4 AM', label: '4'},
  {id: 5, labelAM: '5 AM', label: '5'},
  {id: 6, labelAM: '6 AM', label: '6'},
  {id: 7, labelAM: '7 AM', label: '7'},
  {id: 8, labelAM: '8 AM', label: '8'},
  {id: 9, labelAM: '9 AM', label: '9'},
  {id: 10, labelAM: '10 AM', label: '10'},
  {id: 11, labelAM: '11 AM', label: '11'},
  {id: 12, labelAM: '12 PM', label: '12'},
  {id: 13, labelAM: '1 PM', label: '13'},
  {id: 14, labelAM: '2 PM', label: '14'},
  {id: 15, labelAM: '3 PM', label: '15'},
  {id: 16, labelAM: '4 PM', label: '16'},
  {id: 17, labelAM: '5 PM', label: '17'},
  {id: 18, labelAM: '6 PM', label: '18'},
  {id: 19, labelAM: '7 PM', label: '19'},
  {id: 20, labelAM: '8 PM', label: '20'},
  {id: 21, labelAM: '9 PM', label: '21'},
  {id: 22, labelAM: '10 PM', label: '22'},
  {id: 23, labelAM: '11 PM', label: '23'},
];

export const DateTimeGrid = memo(({tasks = [], daysInView = 3}) => {
  const dumyMonth = Array(30).fill(true);
  const EmptyData30Days = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  const getTaskIndex = startDate => {
    const currentDate = moment();
    return moment(startDate).diff(currentDate, 'd');
  };
  tasks.map(task => {
    EmptyData30Days[getTaskIndex(task.startDate)].push(task);
  });
  const ColWidthFull = 290;
  const colWidth = ColWidthFull / daysInView;
  const gridWidth = colWidth * dumyMonth.length;
  const Categories = ['Health', 'Office', 'Home'];

  let _30DaysData = [
    [
      {
        title: Categories[0],
        startTime: '00:50',
        endTime: '02:30',
        category: Categories[0],
      },
      {
        title: Categories[1],
        startTime: '3:50',
        endTime: '04:30',
        category: Categories[1],
      },
      {
        title: Categories[2],
        startTime: '10:10',
        endTime: '11:30',
        category: Categories[2],
      },
    ],
    [
      {
        title: Categories[1],
        startTime: '2:50',
        endTime: '6:59',
        category: Categories[1],
      },
      {
        title: Categories[2],
        startTime: '10:10',
        endTime: '11:30',
        category: Categories[2],
      },
    ],
    [
      {
        title: Categories[1],
        startTime: '3:50',
        endTime: '04:30',
        category: Categories[1],
      },
    ],
    [
      {
        title: Categories[0],
        startTime: '10:30',
        endTime: '12:40',
        category: Categories[0],
      },
    ],
    [],
    [],
    [
      {
        title: Categories[1],
        startTime: '10:30',
        endTime: '12:40',
        category: Categories[1],
      },
    ],
    [],
    [],
    [
      {
        title: Categories[2],
        startTime: '10:10',
        endTime: '11:30',
        category: Categories[2],
      },
    ],
    [
      {
        title: Categories[2],
        startTime: '10:30',
        endTime: '12:40',
        category: Categories[2],
      },
    ],
    [],
    [
      {
        title: Categories[0],
        startTime: '00:50',
        endTime: '02:30',
        category: Categories[0],
      },
      {
        title: Categories[1],
        startTime: '3:50',
        endTime: '04:30',
        category: Categories[1],
      },
      {
        title: Categories[2],
        startTime: '10:10',
        endTime: '11:30',
        category: Categories[2],
      },
    ],
    [],
    [],
    [
      {
        title: Categories[2],
        startTime: '10:10',
        endTime: '11:30',
        category: Categories[2],
      },
    ],
    [
      {
        title: Categories[0],
        startTime: '00:50',
        endTime: '02:30',
        category: Categories[0],
      },
      {
        title: Categories[1],
        startTime: '3:50',
        endTime: '04:30',
        category: Categories[1],
      },
      {
        title: Categories[2],
        startTime: '10:10',
        endTime: '11:30',
        category: Categories[2],
      },
    ],
    [
      {
        title: Categories[0],
        startTime: '00:50',
        endTime: '02:30',
        category: Categories[0],
      },
    ],
    [],
    [],
    [],
    [
      {
        title: Categories[0],
        startTime: '00:50',
        endTime: '02:30',
        category: Categories[0],
      },
      {
        title: Categories[1],
        startTime: '3:50',
        endTime: '04:30',
        category: Categories[1],
      },
      {
        title: Categories[2],
        startTime: '10:10',
        endTime: '11:30',
        category: Categories[2],
      },
    ],
    [],
    [],
    [],
    [],
    [
      {
        title: Categories[0],
        startTime: '00:50',
        endTime: '02:30',
        category: Categories[0],
      },
      {
        title: Categories[1],
        startTime: '3:50',
        endTime: '04:30',
        category: Categories[1],
      },
      {
        title: Categories[2],
        startTime: '10:10',
        endTime: '11:30',
        category: Categories[2],
      },
    ],
    [],
    [],
    [],
  ];
  _30DaysData = EmptyData30Days;
  const [filteredData, setFilteredData] = useState(_30DaysData);
  const [filter, setFilter] = useState('');
  const timeScrollRef = useRef(null);

  const filterByCategory = useCallback(
    (data, category = '') => {
      if (category === '') {
        setFilteredData(_30DaysData);
        return;
      }
      const filteredData = data.map(dayTasks =>
        dayTasks.filter(task => task.category === category),
      );
      setFilteredData(filteredData);
    },
    [tasks],
  );
  const currentDate = moment();
  const currentTime = currentDate.format('HH:mm');
  const currentTimePlus1 = currentDate.add(1, 'minute').format('HH:mm');
  const dateLabelRef = useRef(null);
  const dateColRef = useRef(null);
  const isSyncingScroll = useRef(false);

  const onScrollView1Scroll = event => {
    if (!isSyncingScroll.current) {
      isSyncingScroll.current = true;
      const {contentOffset} = event.nativeEvent;
      if (dateColRef.current) {
        dateColRef.current.scrollTo({
          x: contentOffset.x,
          y: contentOffset.y,
          animated: false,
        });
      }
      isSyncingScroll.current = false;
    }
  };

  const onScrollView2Scroll = event => {
    if (!isSyncingScroll.current) {
      isSyncingScroll.current = true;
      const {contentOffset} = event.nativeEvent;
      if (dateLabelRef.current) {
        dateLabelRef.current.scrollTo({
          x: contentOffset.x,
          y: contentOffset.y,
          animated: false,
        });
      }
      isSyncingScroll.current = false;
    }
  };

  useEffect(() => {
    currentTimePlus1;
    timeScrollRef.current.scrollTo({
      x: 0,
      y: getPostionAndHeightForEvent(
        {
          startTime: currentTime,
          endTime: currentTimePlus1,
        },
        slabHeight,
      )[0],
    });
  }, [currentTime]);
  useEffect(() => {
    filterByCategory(_30DaysData, filter);
  }, [tasks, filter]);
  const getDateAndDayPerIndex = index => {
    const currentDate = moment();
    const targetDate = currentDate.add(index, 'days');
    const date = targetDate.format('DD');
    const day = targetDate.format('ddd');
    return {date, day};
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      <ScrollView
        ref={dateLabelRef}
        onScroll={onScrollView1Scroll}
        horizontal={true}
        style={{
          maxHeight: s(35),
        }}
        contentContainerStyle={{
          paddingLeft: s(60),
        }}
        showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'row'}}>
          {dumyMonth.map((_, index) => {
            const {date, day} = getDateAndDayPerIndex(index);
            return (
              <View
                key={index}
                style={{
                  width: s(colWidth),
                  height: s(35),
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  backgroundColor: 'white',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: s(5),
                  }}>
                  <Text>{date}</Text>
                  <Text>{day}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <ScrollView
        style={{flex: 1}}
        ref={timeScrollRef}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={{flexDirection: 'row'}}>
          <TimeLineColumnBackground
            key={'label'}
            index
            width={60}
            hours={hours || []}
            events={[
              {
                startTime: currentTime,
                endTime: currentTimePlus1,
                category: Categories[2],
              },
            ]}
          />
          <ScrollView
            horizontal={true}
            bounces={false}
            key={'renderCol'}
            snapToInterval={scale(colWidth + 0.65)}
            ref={dateColRef}
            onScroll={onScrollView2Scroll}>
            <View
              style={{
                flexDirection: 'row',
                width: s(gridWidth),
              }}>
              {dumyMonth.map((_, index) => {
                const dayEvents = filteredData[index];
                const {date} = getDateAndDayPerIndex(index);
                return (
                  <TimeLineColumnBackground
                    key={index}
                    width={colWidth}
                    hours={hours || []}
                    events={dayEvents}
                    date={date}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <View
        style={{
          height: s(50),
          borderTopWidth: 1,
          borderColor: 'lightgray',
        }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              backgroundColor: 'pink',
              width: s(100),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setFilter('');
            }}>
            <Text>{'All'}</Text>
          </TouchableOpacity>
          {Categories.map((category, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  width: s(100),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: categoryColorMap[category],
                }}
                onPress={() => {
                  setFilter(category);
                }}>
                <Text>{category}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
});
