import React, { Component } from 'react';
import { Table } from 'reactabular';

const data = [
  {
    name: 'React.js',
    type: 'library',
    description: 'Awesome library for handling view.',
    followers: 23252,
    worksWithReactabular: true,
    id: 123,
  },
  {
    name: 'Angular.js',
    type: 'framework',
    description: 'Swiss-knife of frameworks. Kitchen sink not included.',
    followers: 35159,
    worksWithReactabular: false,
    id: 456,
  },
  {
    name: 'Aurelia',
    type: 'framework',
    description: 'Framework for the next generation.',
    followers: 229,
    worksWithReactabular: false,
    id: 789,
  },
];

const columns = [
  {
    property: 'name',
    header: 'Name',
  },
  {
    property: 'type',
    header: 'Type',
  },
  {
    property: 'description',
    header: 'Description',
  },
  {
    property: 'followers',
    header: 'Followers',

    // accuracy per hundred is enough for demoing
    cell: (followers) => followers - (followers % 100),
  },
  {
    property: 'worksWithReactabular',
    header: '1st Class Reactabular',

    // render utf ok if works
    cell: (works) => works && <span>&#10003;</span>,
  },
];

export default class AboutPage extends Component {
  render() {
    return (
      <div>
        <span>About page !!!</span>
        <Table columns={columns} data={data} />
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    );
  }
}
