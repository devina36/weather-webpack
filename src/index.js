import './style/style.css';
import 'regenerator-runtime';
import $ from 'jquery';
import moment from 'moment';
import main from './script/main';

const time = () => {
  moment.locale('en');
  $('.time').text(moment().format('LT'));
  $('.date').text(moment().format('LL'));
};

const update = () => {
  time();
  setTimeout(update, 1000);
};

update();
main();
