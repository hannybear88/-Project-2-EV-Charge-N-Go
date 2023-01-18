module.exports = {
    format_date: date => {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      },
    format_time: date => {
        var hours = date.split(':')[0];
  var minutes = date.split(':')[1];
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
      }
};
