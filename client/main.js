import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import MainApp from '../imports/ui/mainApp';

Meteor.startup(() => {
  render(<MainApp />, document.getElementById('app'));
});
