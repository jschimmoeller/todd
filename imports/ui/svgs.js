import React from 'react';
import { ContainerIconSVG } from './svg-container';

class CalendarIconSVG extends React.Component{
  render(){
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
        <path d="M10 12h4v4h-4zM16 12h4v4h-4zM22 12h4v4h-4zM4 24h4v4h-4zM10 24h4v4h-4zM16 24h4v4h-4zM10 18h4v4h-4zM16 18h4v4h-4zM22 18h4v4h-4zM4 18h4v4h-4zM26 0v2h-4v-2h-14v2h-4v-2h-4v32h30v-32h-4zM28 30h-26v-22h26v22z"></path>
     </ContainerIconSVG>
    );
  }
}
// Arrow down icon : use to navigate down
class ArrowDownIconSVG extends React.Component {

  render() {
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
          <rect x="15" y="8" width="2" height="14" rx="1" />
          <path d="M 10.71,16.29 L 16.71,22.29 15.29,22.29 21.29,16.29 C 21.68,15.9 22.32,15.9 22.71,16.29 23.1,16.68 23.1,17.32 22.71,17.71 L 16.71,23.71 C 16.32,24.1 15.68,24.1 15.29,23.71 L 9.29,17.71 C 8.9,17.32 8.9,16.68 9.29,16.29 9.68,15.9 10.32,15.9 10.71,16.29 Z M 10.71,16.29" />
     </ContainerIconSVG>
    );
  }
}

// Arrow up icon : use to navigate up
class ArrowUpIconSVG extends React.Component {

  render() {
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
          <rect x="15" y="10" width="2" height="14" rx="1" />
          <path d="M 9.29,14.29 L 15.29,8.29 C 15.68,7.9 16.32,7.9 16.71,8.29 L 22.71,14.29 C 23.1,14.68 23.1,15.32 22.71,15.71 22.32,16.1 21.68,16.1 21.29,15.71 L 16,10.41 10.71,15.71 C 10.32,16.1 9.68,16.1 9.29,15.71 8.9,15.32 8.9,14.68 9.29,14.29 Z M 9.29,14.29" />
     </ContainerIconSVG>
    );
  }
}


// Back icon : Use when returning to a view
class BackIconSVG extends React.Component {

  render() {
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
          <path d="M 15.71,9.29 C 16.1,9.68 16.1,10.32 15.71,10.71 15.71,10.71 12.95,13.46 11.41,15 L 23,15 C 23.55,15 24,15.45 24,16 24,16.55 23.55,17 23,17 L 11.41,17 C 12.94,18.53 15.71,21.29 15.71,21.29 16.1,21.68 16.1,22.32 15.71,22.71 15.32,23.1 14.68,23.1 14.29,22.71 L 8.29,16.71 C 8.13,16.55 8.04,16.34 8.01,16.13 7.97,15.84 8.06,15.52 8.29,15.29 L 14.29,9.29 C 14.68,8.9 15.32,8.9 15.71,9.29 Z M 15.71,9.29" />
      </ContainerIconSVG>
    );
  }
}

// Back with border icon : Use when return to a view and a border is needed
class BackBorderIconSVG extends React.Component {

  render() {
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
          <path d="M 32,16 C 32,24.84 24.84,32 16,32 7.16,32 0,24.84 0,16 0,7.16 7.16,-0 16,-0 24.84,0 32,7.16 32,16 L 30,16 C 30,8.27 23.73,2 16,2 8.27,2 2,8.27 2,16 2,23.73 8.27,30 16,30 23.73,30 30,23.73 30,16 L 32,16 Z M 32,16" />
          <path d="M 15.71,9.29 C 16.1,9.68 16.1,10.32 15.71,10.71 15.71,10.71 12.95,13.46 11.41,15 L 23,15 C 23.55,15 24,15.45 24,16 24,16.55 23.55,17 23,17 L 11.41,17 C 12.94,18.53 15.71,21.29 15.71,21.29 16.1,21.68 16.1,22.32 15.71,22.71 15.32,23.1 14.68,23.1 14.29,22.71 L 8.29,16.71 C 8.13,16.55 8.04,16.34 8.01,16.13 7.97,15.84 8.06,15.52 8.29,15.29 L 14.29,9.29 C 14.68,8.9 15.32,8.9 15.71,9.29 Z M 15.71,9.29" />
      </ContainerIconSVG>
    );
  }
}

// Close icon : use when collasping content
class CloseIconSVG extends React.Component {

  render() {
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
          <path d="M 16,14.59 L 11.76,10.34 C 11.36,9.95 10.73,9.95 10.34,10.34 9.95,10.74 9.95,11.37 10.34,11.76 L 14.59,16 10.34,20.24 C 9.95,20.64 9.95,21.27 10.34,21.66 10.74,22.05 11.37,22.05 11.76,21.66 L 16,17.41 20.24,21.66 C 20.64,22.05 21.27,22.05 21.66,21.66 22.05,21.26 22.05,20.63 21.66,20.24 L 17.41,16 21.66,11.76 C 22.05,11.36 22.05,10.73 21.66,10.34 21.26,9.95 20.63,9.95 20.24,10.34 L 16,14.59 16,14.59 16,14.59 Z M 16,14.59" />
      </ContainerIconSVG>
    );
  }
}

// Close icon : use when collapsing content and a border is needed
class CloseBorderIconSVG extends React.Component {

  render() {
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
          <path d="M 32,16 C 32,24.84 24.84,32 16,32 7.16,32 0,24.84 0,16 0,7.16 7.16,-0 16,-0 24.84,0 32,7.16 32,16 L 30,16 C 30,8.27 23.73,2 16,2 8.27,2 2,8.27 2,16 2,23.73 8.27,30 16,30 23.73,30 30,23.73 30,16 L 32,16 Z M 32,16" />
          <path d="M 16,14.59 L 11.76,10.34 C 11.36,9.95 10.73,9.95 10.34,10.34 9.95,10.74 9.95,11.37 10.34,11.76 L 14.59,16 10.34,20.24 C 9.95,20.64 9.95,21.27 10.34,21.66 10.74,22.05 11.37,22.05 11.76,21.66 L 16,17.41 20.24,21.66 C 20.64,22.05 21.27,22.05 21.66,21.66 22.05,21.26 22.05,20.63 21.66,20.24 L 17.41,16 21.66,11.76 C 22.05,11.36 22.05,10.73 21.66,10.34 21.26,9.95 20.63,9.95 20.24,10.34 L 16,14.59 16,14.59 16,14.59 Z M 16,14.59" />
      </ContainerIconSVG>
    );
  }
}
// TODO: Contacts changing to simplified version
// Contacts icon : use when navigating to contacts list
class ContactsIconSVG extends React.Component {

  render() {
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
          <path d="M5 7L27 7C27.55 7 28 7.45 28 7.99L28 24.01C28 24.56 27.55 25 27 25L5 25C4.45 25 4 24.55 4 24.01L4 7.99C4 7.44 4.45 7 5 7ZM2 24.01C2 25.66 3.34 27 5 27L27 27C28.66 27 30 25.66 30 24.01L30 7.99C30 6.34 28.66 5 27 5L5 5C3.34 5 2 6.34 2 7.99L2 24.01Z"/>
          <path d="M12 20.44C12 19.67 13.49 19 16 19 18.51 19 20 19.67 20 20.44L20 22C20 22.55 20.45 23 21 23 21.55 23 22 22.55 22 22L22 20.44C22 18.12 19.49 17 16 17 12.51 17 10 18.12 10 20.44L10 22C10 22.55 10.45 23 11 23 11.55 23 12 22.55 12 22L12 20.44Z"/>
          <path d="M20 12C20 9.79 18.21 8 16 8 13.79 8 12 9.79 12 12 12 14.21 13.79 16 16 16 18.21 16 20 14.21 20 12ZM14 12C14 10.9 14.9 10 16 10 17.1 10 18 10.9 18 12 18 13.1 17.1 14 16 14 14.9 14 14 13.1 14 12Z"/>
          <rect x="2" width="28" height="2" rx="1"/>
          <rect x="2" y="30" width="28" height="2" rx="1"/>
     </ContainerIconSVG>
    );
  }
}

// Settings icon : use to represent general settings
class SettingsIconSVG extends React.Component {

  render() {
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
          <path d="M 20.23,26.49 C 20.08,28.11 18.65,29.39 17.02,29.35 L 15.26,29.32 C 13.65,29.29 12.23,28.01 12.03,26.43 L 11.77,24.36 12.77,24.23 12.34,25.14 C 11.42,24.71 10.7,24.28 10.17,23.86 L 10.79,23.08 11.19,23.99 9.41,24.77 C 7.93,25.42 6.12,24.82 5.31,23.42 L 4.38,21.81 C 3.57,20.42 3.96,18.55 5.26,17.59 L 6.83,16.43 7.42,17.24 6.43,17.37 C 6.32,16.54 6.31,15.69 6.41,14.83 L 7.41,14.95 6.8,15.75 5.14,14.49 C 3.86,13.52 3.47,11.65 4.25,10.25 L 5.1,8.7 C 5.89,7.27 7.7,6.68 9.18,7.36 L 11.05,8.23 10.63,9.13 10.01,8.35 C 10.25,8.15 10.61,7.93 11.08,7.65 11.55,7.38 11.93,7.19 12.22,7.07 L 12.58,8 11.59,7.91 11.77,5.87 C 11.92,4.24 13.35,2.97 14.98,3 L 16.74,3.03 C 18.35,3.07 19.77,4.34 19.97,5.93 L 20.23,8 19.23,8.12 19.66,7.22 C 20.58,7.65 21.3,8.07 21.83,8.5 L 21.21,9.28 20.81,8.36 22.59,7.58 C 24.07,6.94 25.88,7.53 26.69,8.93 L 27.62,10.54 C 28.43,11.94 28.04,13.81 26.74,14.76 L 25.17,15.92 24.58,15.12 25.57,14.98 C 25.68,15.82 25.69,16.66 25.59,17.52 L 24.59,17.41 25.2,16.61 26.86,17.87 C 28.14,18.83 28.53,20.71 27.75,22.11 L 26.9,23.65 C 26.11,25.08 24.3,25.67 22.82,24.99 L 20.95,24.13 21.37,23.22 21.99,24.01 C 21.75,24.2 21.39,24.43 20.92,24.7 20.45,24.97 20.07,25.17 19.78,25.28 L 19.42,24.35 20.41,24.44 20.23,26.49 Z M 18.23,26.31 L 18.42,24.26 18.48,23.65 19.05,23.42 C 19.23,23.35 19.52,23.2 19.92,22.97 20.32,22.74 20.6,22.56 20.75,22.44 L 21.23,22.06 21.79,22.31 23.65,23.18 C 24.18,23.42 24.87,23.2 25.15,22.69 L 26,21.14 C 26.3,20.61 26.13,19.82 25.65,19.46 L 23.99,18.2 23.53,17.86 23.6,17.29 C 23.68,16.6 23.68,15.92 23.59,15.25 L 23.51,14.67 23.98,14.31 25.55,13.15 C 26.03,12.8 26.19,12.06 25.89,11.54 L 24.96,9.93 C 24.66,9.41 23.94,9.18 23.39,9.42 L 21.61,10.2 21.05,10.44 20.58,10.06 C 20.19,9.74 19.59,9.4 18.81,9.03 L 18.31,8.79 18.24,8.25 17.98,6.17 C 17.91,5.58 17.31,5.05 16.7,5.03 L 14.94,5 C 14.36,4.99 13.82,5.47 13.77,6.05 L 13.58,8.09 13.52,8.71 12.95,8.93 C 12.77,9.01 12.48,9.16 12.08,9.39 11.68,9.62 11.4,9.8 11.25,9.92 L 10.77,10.3 10.21,10.04 8.35,9.18 C 7.82,8.94 7.13,9.16 6.85,9.67 L 6,11.22 C 5.7,11.75 5.87,12.53 6.35,12.89 L 8.01,14.15 8.47,14.5 8.4,15.07 C 8.32,15.76 8.32,16.44 8.41,17.1 L 8.49,17.69 8.02,18.04 6.45,19.2 C 5.97,19.55 5.81,20.3 6.11,20.81 L 7.04,22.42 C 7.34,22.94 8.06,23.18 8.61,22.94 L 10.39,22.16 10.95,21.92 11.42,22.3 C 11.81,22.61 12.41,22.96 13.19,23.33 L 13.69,23.56 13.76,24.11 14.02,26.18 C 14.09,26.78 14.69,27.31 15.3,27.32 L 17.06,27.35 C 17.64,27.37 18.18,26.88 18.23,26.31 Z M 18.23,26.31" />
          <path d="M 20,16.18 C 20,18.39 18.21,20.18 16,20.18 13.79,20.18 12,18.39 12,16.18 12,13.97 13.79,12.18 16,12.18 18.21,12.18 20,13.97 20,16.18 L 18,16.18 C 18,15.07 17.1,14.18 16,14.18 14.9,14.18 14,15.07 14,16.18 14,17.28 14.9,18.18 16,18.18 17.1,18.18 18,17.28 18,16.18 L 20,16.18 Z M 20,16.18" />
      </ContainerIconSVG>
    );
  }
}

// Edit icon : use when making content editable
class EditIconSVG extends React.Component {

  render() {
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
         <path d="M14.59 10.34L17.41 7.51C19.53 5.4 22.46 5.49 24.49 7.51 26.51 9.54 26.6 12.47 24.49 14.59L21.66 17.41 16 23.07C15.86 23.21 15.68 23.31 15.49 23.34L8.42 24.76C7.72 24.9 7.1 24.28 7.24 23.58L8.66 16.51C8.69 16.32 8.79 16.14 8.93 16L14.59 10.34ZM16 11.76L10.34 17.41 9.49 22.55 14.59 21.66 20.24 16 23.07 13.17C24.38 11.86 24.33 10.19 23.07 8.93 21.81 7.67 20.14 7.62 18.83 8.93L16 11.76ZM16 11.76"/>
         <path d="M13.86 12.48L19.52 18.14 20.94 16.72 15.28 11.06 13.86 12.48ZM13.86 12.48"/>
         <path d="M9.61 16.73L15.27 22.39 16.69 20.97 11.03 15.31 9.61 16.73ZM9.61 16.73"/>
         <path d="M16.71 9.63L22.37 15.29 23.79 13.87 18.13 8.21 16.71 9.63ZM16.71 9.63"/>
     </ContainerIconSVG>
    );
  }
}

// Edit with border icon : use when making content editable
class EditBorderIconSVG extends React.Component {

  render() {
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
         <path d="M14.59 10.34L17.41 7.51C19.53 5.4 22.46 5.49 24.49 7.51 26.51 9.54 26.6 12.47 24.49 14.59L21.66 17.41 16 23.07C15.86 23.21 15.68 23.31 15.49 23.34L8.42 24.76C7.72 24.9 7.1 24.28 7.24 23.58L8.66 16.51C8.69 16.32 8.79 16.14 8.93 16L14.59 10.34ZM16 11.76L10.34 17.41 9.49 22.55 14.59 21.66 20.24 16 23.07 13.17C24.38 11.86 24.33 10.19 23.07 8.93 21.81 7.67 20.14 7.62 18.83 8.93L16 11.76ZM16 11.76"/>
         <path d="M13.86 12.48L19.52 18.14 20.94 16.72 15.28 11.06 13.86 12.48ZM13.86 12.48"/>
         <path d="M9.61 16.73L15.27 22.39 16.69 20.97 11.03 15.31 9.61 16.73ZM9.61 16.73"/>
         <path d="M16.71 9.63L22.37 15.29 23.79 13.87 18.13 8.21 16.71 9.63ZM16.71 9.63"/>
         <path d="M32 16C32 24.84 24.84 32 16 32 7.16 32 0 24.84 0 16 0 7.16 7.16 0 16 0 24.84 0 32 7.16 32 16L30 16C30 8.27 23.73 2 16 2 8.27 2 2 8.27 2 16 2 23.73 8.27 30 16 30 23.73 30 30 23.73 30 16L32 16ZM32 16"/>
     </ContainerIconSVG>
    );
  }
}
// Add icon : use when adding content
class AddIconSVG extends React.Component {

  render() {
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
          <path d="M 15,15 L 9,15 C 8.44,15 8,15.45 8,16 8,16.56 8.45,17 9,17 L 15,17 15,23 C 15,23.56 15.45,24 16,24 16.56,24 17,23.55 17,23 L 17,17 23,17 C 23.56,17 24,16.55 24,16 24,15.44 23.55,15 23,15 L 17,15 17,9 C 17,8.44 16.55,8 16,8 15.44,8 15,8.45 15,9 L 15,15 15,15 Z M 15,15" />      </ContainerIconSVG>
    );
  }
}

// Add with border icon : use when adding content
class AddBorderIconSVG extends React.Component {

  render() {
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
          <path d="M 32,16 C 32,24.84 24.84,32 16,32 7.16,32 0,24.84 0,16 0,7.16 7.16,-0 16,-0 24.84,0 32,7.16 32,16 L 30,16 C 30,8.27 23.73,2 16,2 8.27,2 2,8.27 2,16 2,23.73 8.27,30 16,30 23.73,30 30,23.73 30,16 L 32,16 Z M 32,16" />
          <path d="M 15,15 L 9,15 C 8.44,15 8,15.45 8,16 8,16.56 8.45,17 9,17 L 15,17 15,23 C 15,23.56 15.45,24 16,24 16.56,24 17,23.55 17,23 L 17,17 23,17 C 23.56,17 24,16.55 24,16 24,15.44 23.55,15 23,15 L 17,15 17,9 C 17,8.44 16.55,8 16,8 15.44,8 15,8.45 15,9 L 15,15 15,15 Z M 15,15" />      </ContainerIconSVG>
    );
  }
}

// Carrot down left icon : used to display incoming content
class CaretDownIconSVG extends React.Component {

  render() {
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
          <path d="M 9,12.5 C 8.55,12.5 8.33,13.04 8.65,13.35 L 15.72,20.42 C 15.91,20.62 16.23,20.62 16.42,20.42 L 23.5,13.35 C 23.81,13.04 23.59,12.5 23.14,12.5 L 16.07,12.5 9,12.5 Z M 9,12.5" />
      </ContainerIconSVG>
    );
  }
}

// Carrot down left icon : used to display incoming content
class CaretUpIconSVG extends React.Component {

  render() {
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
          <path d="M 23.14,18.57 C 23.59,18.57 23.81,18.03 23.5,17.72 L 16.42,10.65 C 16.23,10.45 15.91,10.45 15.72,10.65 L 8.65,17.72 C 8.33,18.03 8.55,18.57 9,18.57 L 16.07,18.57 23.14,18.57 Z M 23.14,18.57" />
      </ContainerIconSVG>
    );
  }
}
// Help icon : used to visualize help
class HelpIconSVG extends React.Component {

  render() {
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
          <path d="M 32,16 C 32,24.84 24.84,32 16,32 7.16,32 0,24.84 0,16 0,7.16 7.16,-0 16,-0 24.84,0 32,7.16 32,16 L 30,16 C 30,8.27 23.73,2 16,2 8.27,2 2,8.27 2,16 2,23.73 8.27,30 16,30 23.73,30 30,23.73 30,16 L 32,16 Z M 32,16" />
          <path d="M 10.29,11 C 10.29,8.28 12.53,6 15.55,6 18.96,6 21.57,8.69 20.99,12.16 20.73,13.68 19.98,14.54 18.57,15.41 18.47,15.47 18.13,15.67 18.13,15.67 17.24,16.21 17.02,16.46 17.02,17 17.02,18.58 17.02,18.58 17.02,19 17.02,19.55 16.58,20 16.02,20 15.47,20 15.02,19.55 15.02,19 15.02,18.58 15.02,18.58 15.02,17 15.02,15.57 15.66,14.83 17.09,13.96 17.09,13.96 17.43,13.76 17.52,13.7 18.49,13.11 18.87,12.67 19.01,11.84 19.38,9.65 17.78,8 15.55,8 13.64,8 12.29,9.38 12.29,11 12.29,11.55 11.84,12 11.29,12 10.74,12 10.29,11.55 10.29,11 Z M 10.29,11" />
          <circle cx="16" cy="24" r="2" />
      </ContainerIconSVG>
    );
  }
}

// Search icon : use when filtering or searching
class SearchIconSVG extends React.Component {

  render() {
    return (
      <ContainerIconSVG svgStyle={this.props.svgStyle}>
        <title>{this.props.title}</title>
        <desc>{this.props.description}</desc>
          <path d="M 2.31,28.28 C 1.92,28.67 1.92,29.3 2.31,29.69 L 2.31,29.69 C 2.7,30.08 3.33,30.08 3.72,29.69 L 10.79,22.62 C 11.18,22.23 11.18,21.6 10.79,21.21 L 10.79,21.21 C 10.4,20.82 9.77,20.82 9.38,21.21 L 2.31,28.28 Z M 2.31,28.28" />
          <path d="M 31,12 C 31,18.08 26.08,23 20,23 13.92,23 9,18.08 9,12 9,5.92 13.92,1 20,1 26.08,1 31,5.92 31,12 L 29,12 C 29,7.03 24.97,3 20,3 15.03,3 11,7.03 11,12 11,16.97 15.03,21 20,21 24.97,21 29,16.97 29,12 L 31,12 Z M 31,12" />
      </ContainerIconSVG>
    );
  }
}

export {
  CalendarIconSVG,
  ArrowDownIconSVG,
  ArrowUpIconSVG,
  BackIconSVG,
  BackBorderIconSVG,
  CloseIconSVG,
  CloseBorderIconSVG,
  ContactsIconSVG,
  SettingsIconSVG,
  AddIconSVG,
  AddBorderIconSVG,
  EditIconSVG,
  EditBorderIconSVG,
  CaretDownIconSVG,
  CaretUpIconSVG,
  HelpIconSVG,
  SearchIconSVG,
};
