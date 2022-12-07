// import 'date-fns';
// import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardTimePicker,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';
// import {makeStyles} from "@material-ui/core";
//
// const useStyles=makeStyles({
//     root:{
//
//     }
// });
// export default function MaterialUIPickers() {
//     // The first commit of Material-UI
//     const [selectedDate, setSelectedDate] = React.useState(new Date('2000-08-18T21:11:54'));
//
//     const handleDateChange = date => {
//         setSelectedDate(date);
//     };
//
//
//     return (
//         <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                 <KeyboardDatePicker
//                     disableToolbar
//                     variant="inline"
//                     format="dd/MM/yyyy"
//                     margin="normal"
//                     id="birth-date"
//                     label="Birth Date"
//                     value={selectedDate}
//                     onChange={handleDateChange}
//                     KeyboardButtonProps={{
//                         'aria-label': 'change date',
//                     }}
//                     fullWidth
//                 />
//         </MuiPickersUtilsProvider>
//     );
// }