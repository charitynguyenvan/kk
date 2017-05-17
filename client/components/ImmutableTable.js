import React from 'react'
import ReactDataGrid from 'react-data-grid'

const products = ['Xà phòng Lifebuoy', "Monster", 'Giày Nike v0.1']

const getProduct = () => {
  let index = parseInt(Math.floor( Math.random() * (products.length - 1)))
  return products[index]
}

const getPrice = () => (Math.round(Math.random() * 1000000) / 1000)

export default class ImmutableTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      columns : [
        {
          key: 'STT',
          name: 'STT',
          width: 50
        },
        {
          key: 'Tên sản phẩm',
          name: 'Tên sản phẩm' },
        {
          key: 'Giá',
           name: 'Giá'
         }
      ],
      rows: this.createRows()
    }

    this.rowGetter = this.rowGetter.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  createRows () {
    let rows = [];
    for (let i = 0; i < 13; i++) {
      rows.push({
        STT: i + 1,
        'Tên sản phẩm': getProduct(),
        Giá: getPrice()
      });
    }

    return rows;
  }

  rowGetter(i) {
    return this.state.rows[i];
  }

  handleEdit(e) {

  }

  render() {
    return  (
      <div>
        <button onClick={this.handleEdit}>Edit</button>
        <ReactDataGrid
          enableCellSelect={true}
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
         />
      </div>
    )
  }
}
