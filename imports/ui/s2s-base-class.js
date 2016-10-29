import React from 'react';

const objectMerge = require('object-merge');

class S2SBaseComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  getClassName() {
    //console.log('*****', this, this.constructor.name );
    let dName;
    if (typeof(this.displayName) === 'string') {
      dName = this.displayName;
    } else if (typeof(this.displayName) === 'undefined' && this.constructor && typeof(this.constructor.name) === 'string'){
      //console.log('>>>>>>>', this.constructor.name, this );
      dName =this.constructor.name;
    } else {
      console.warn('class missing displayName', typeof(this.displayName), this.displayName, this.constructor, this.constructor && this.constructor.name,  this);
      dName = 'undefined';
    }

    return dName;
  }

  applyThemeStyle(styleName, styles) {
    // NOTE: the 'themes' object is imported (in case you are looking for where
    // it is defined)

    const componentName = this.getClassName().toLowerCase();
    if(this.props.themeStyle && this.props.themeStyle[componentName] && this.props.themeStyle[componentName][styleName]) {
      return( objectMerge( styles, this.props.themeStyle[componentName][styleName])); //{ ...styles, ...this.props.themeStyle[componentName][styleName]});
    } else{
      return( styles );
    }
  }

  getCompStyle(styleName) {
    return this.props.compStyle && this.props.compStyle[styleName] ? this.props.compStyle[styleName] :  this.props.compStyle;
  }

  getStyle(styleName) {
    let styleReturn = this.getDefaultStyle(styleName);
    //console.log('getStyle default: '+styleName , {...styleReturn});

    // apply the themed styling
    if(this.props.themeStyle) {
      styleReturn = this.applyThemeStyle(styleName, styleReturn);
    }
    //console.log('getStyle themed: '+styleName, {...styleReturn});

    // apply style from props
    const compStyle = this.getCompStyle(styleName);
    if (compStyle){
      styleReturn = objectMerge( styleReturn, compStyle); //{ ...styleReturn, ...this.getCompStyle(styleName) };
    }
    //console.log('getStyle returing ... with comp: '+styleName, {...styleReturn});
    return styleReturn;
  }

  getIntlText(keyName, defaultMsg){
    //console.log('Intl: ', this.getClassName(), keyName);
    let sMessage = defaultMsg;
    if (this.props.intl) {
      const intlMsg = this.props.intl.formatMessage({"id": keyName });
      if (intlMsg != keyName){
        sMessage = intlMsg;
      }
    }

    return sMessage;
  }
}



export default S2SBaseComponent;
