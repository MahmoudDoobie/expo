import { DateTimePicker, DateTimePickerProps, Picker } from '@expo/ui/jetpack-compose';
import * as React from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';

import { Page, Section } from '../../components/Page';

export default function DatePickerScreen() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const displayOptions = ['picker', 'input'];
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const typeOptions = ['date', 'hourAndMinute', 'dateAndTime'];
  const [typeIndex, setTypeIndex] = React.useState(0);

  function getPickerType() {
    const str = displayOptions[selectedIndex];
    return `${str.charAt(0).toUpperCase()}${str.slice(1)} picker`;
  }

  return (
    <ScrollView>
      <Page>
        <Section title="Selected Date">
          <Text>{selectedDate.toDateString()}</Text>
        </Section>
        <Section title="Selected Time">
          <Text>{selectedDate.toTimeString()}</Text>
        </Section>
        <Section title={getPickerType()}>
          <View style={{ gap: 20 }}>
            <DateTimePicker
              onDateSelected={(date) => {
                setSelectedDate(date);
              }}
              displayedComponents={
                typeOptions[typeIndex] as DateTimePickerProps['displayedComponents']
              }
              initialDate={selectedDate.toISOString()}
              variant={displayOptions[selectedIndex] as DateTimePickerProps['variant']}
              style={{ height: Platform.select({ android: 520, ios: undefined }) }}
              showVariantToggle
              is24Hour
            />

            <Picker
              options={displayOptions}
              selectedIndex={selectedIndex}
              onOptionSelected={({ nativeEvent: { index } }) => {
                setSelectedIndex(index);
              }}
              variant="segmented"
              style={{ height: 30 }}
            />

            <Picker
              options={typeOptions}
              selectedIndex={typeIndex}
              onOptionSelected={({ nativeEvent: { index } }) => {
                setTypeIndex(index);
              }}
              variant="segmented"
              style={{ height: 30 }}
            />
          </View>
        </Section>
      </Page>
    </ScrollView>
  );
}

DatePickerScreen.navigationOptions = {
  title: 'DatePicker',
};
