import React from 'react'
import update from 'immutability-helper'
import faker from 'faker'
import ReactDataGrid from 'react-data-grid'
import { Editors, Toolbar, Formatters } from 'react-data-grid-addons'
import { DraggableHeader } from 'react-data-grid-addons'
import HeaderRenderer from './HeaderRenderer'
import RowRenderer from './RowRenderer'

const { DraggableContainer } = DraggableHeader
const { AutoComplete: AutoCompleteEditor, DropDownEditor, EditorContainer  } = Editors
const { ImageFormatter } = Formatters

faker.locale = 'en_GB';

const counties = [
  { id: 0, title: 'Bedfordshire'},
  { id: 1, title: 'Berkshire'},
  { id: 2, title: 'Buckinghamshire'},
  { id: 3, title: 'Cambridgeshire'},
  { id: 4, title: 'Cheshire'},
  { id: 5, title: 'Cornwall'},
  { id: 6, title: 'Cumbria, (Cumberland)'},
  { id: 7, title: 'Derbyshire'},
  { id: 8, title: 'Devon'},
  { id: 9, title: 'Dorset'},
  { id: 10, title: 'Durham'},
  { id: 11, title: 'Essex'},
  { id: 12, title: 'Gloucestershire'},
  { id: 13, title: 'Hampshire'},
  { id: 14, title: 'Hertfordshire'},
  { id: 15, title: 'Huntingdonshire'},
  { id: 16, title: 'Kent'},
  { id: 17, title: 'Lancashire'},
  { id: 18, title: 'Leicestershire'},
  { id: 19, title: 'Lincolnshire'},
  { id: 20, title: 'Middlesex'},
  { id: 21, title: 'Norfolk'},
  { id: 22, title: 'Northamptonshire'},
  { id: 23, title: 'Northumberland'},
  { id: 24, title: 'Nottinghamshire'},
  { id: 25, title: 'Northamptonshire'},
  { id: 26, title: 'Oxfordshire'},
  { id: 27, title: 'Northamptonshire'},
  { id: 28, title: 'Rutland'},
  { id: 29, title: 'Shropshire'},
  { id: 30, title: 'Somerset'},
  { id: 31, title: 'Staffordshire'},
  { id: 32, title: 'Suffolk'},
  { id: 33, title: 'Surrey'},
  { id: 34, title: 'Sussex'},
  { id: 35, title: 'Warwickshire'},
  { id: 36, title: 'Westmoreland'},
  { id: 37, title: 'Wiltshire'},
  { id: 38, title: 'Worcestershire'},
  { id: 39, title: 'Yorkshire'}
];

const titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'];

export default class YYY extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      xxx: 'Title',
      columns: [
        {
          key: 'stt',
          name: 'STT',
          // width: 80,
          resizable: true,
          draggable: true
        },
        {
          key: 'avartar',
          name: 'Avartar',
          // width: 60,
          formatter: ImageFormatter,
          resizable: true,
          draggable: true,
          // headerRenderer: <ImageFormatter value={faker.image.cats()} />
        },
        {
          key: 'county',
          name: 'County',
          editor: <AutoCompleteEditor options={counties}/>,
          // width: 200,
          resizable: true,
          draggable: true
        },
        {
          key: 'title',
          name: 'Title',
          editor: <DropDownEditor options={titles}/>,
          // width: 200,
          resizable: true,
          draggable: true,
          events: {
            onDoubleClick: function() {
              console.log('The user double clicked on title column');
            }
          }
        },
        {
          key: 'firstName',
          name: 'First Name',
          editable: true,
          // width: 200,
          resizable: true,
          draggable: true,
          headerRenderer: <HeaderRenderer value='fdsfsf' handleClick={() => alert('OK, I am fine!')}/>
        },
        {
          key: 'lastName',
          name: 'Last Name',
          editable: true,
          // width: 200,
          resizable: true,
          draggable: true
        }
      ],
      rows: this.createRows(7)
    }
    this.getRowAt = this.getRowAt.bind(this)
    this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this)
    this.handleAddRow = this.handleAddRow.bind(this)
    this.handleAddColumn = this.handleAddColumn.bind(this)
    this.onHeaderDrop = this.onHeaderDrop.bind(this)
  }

  createRows(numberOfRows) {
    let rows = [];
    for (let i = 0; i < numberOfRows; i++) {
      rows[i] = this.createFakeRowObjectData(i)
    }
    return rows
  }

  createFakeRowObjectData(index) {
    return {
      stt: index + 1,
      avartar: faker.image.avatar(),
      county: faker.address.county(),
      email: faker.internet.email(),
      title: faker.name.prefix(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      // street: faker.address.streetName(),
      // zipCode: faker.address.zipCode(),
      // date: faker.date.past().toLocaleDateString(),
      // bs: faker.company.bs(),
      // catchPhrase: faker.company.catchPhrase(),
      // companyName: faker.company.companyName(),
      // words: faker.lorem.words(),
      // sentence: faker.lorem.sentence()
    }
  }

  getColumns() {
    let clonedColumns = this.state.columns.slice();

    // if(clonedColumns.length > 2) {
    //   clonedColumns[2].events = {
    //     onClick: (ev, args) => {
    //       const idx = args.idx;
    //       const rowIdx = args.rowIdx;
    //       this.grid.openCellEditor(rowIdx, idx);
    //     }
    //   }
    // }

    return clonedColumns
  }

  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    let rows = this.state.rows.slice()

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i]
      let updatedRow = update(rowToUpdate, {$merge: updated})
      rows[i] = updatedRow
    }

    this.setState({ rows })
  }

  handleAddRow({ newRowIndex }) {
    const newRow = {
      value: newRowIndex,
      userStory: '',
      developer: '',
      epic: ''
    }

    let rows = this.state.rows.slice()
    rows = update(rows, {$push: [newRow]})
    this.setState({ rows })
  }

  handleAddColumn({ newColumnIndex }) {
    const newColumn = {
      key: 'XXX' + Math.random(),
      name: 'XXX',
      editable: true,
      width: 200,
      resizable: true,
      draggable: true
    }

    let columns = this.state.columns.slice()
    columns = update(columns, {$push: [newColumn]})
    this.setState({ columns })
  }

  getRowAt(index) {
    if (index < 0 || index > this.getSize()) {
      return undefined
    }

    return this.state.rows[index]
  }

  getSize() {
    return this.state.rows.length
  }

  onHeaderDrop (source, target) {
    const stateCopy = Object.assign({}, this.state);
    const columnSourceIndex = this.state.columns.findIndex(
      i => i.key === source
    )
    const columnTargetIndex = this.state.columns.findIndex(
      i => i.key === target
    )

    stateCopy.columns.splice(
      columnTargetIndex,
      0,
      stateCopy.columns.splice(columnSourceIndex, 1)[0]
    )

    const emptyColumns = { ...this.state,  columns: [] }
    this.setState(
      emptyColumns
    )

    const reorderedColumns = { ...this.state,  columns: stateCopy.columns }
    this.setState(
      reorderedColumns
    )
  }

  render() {
    return (
      <div>
        <button onClick={this.handleAddColumn} >Add Column</button>
        <DraggableContainer
          onHeaderDrop={this.onHeaderDrop}>
          <ReactDataGrid
            ref={ node => this.grid = node }
            enableCellSelect={true}
            columns={this.getColumns()}
            rowGetter={this.getRowAt}
            rowsCount={this.getSize()}
            onGridRowsUpdated={this.handleGridRowsUpdated}
            toolbar={<Toolbar onAddRow={this.handleAddRow}/>}
            rowRenderer={RowRenderer}
            // enableRowSelect={true}
            rowHeight={50}
            minHeight={600}
            rowScrollTimeout={200}
          />
        </DraggableContainer>
      </div>
    )
  }
}
