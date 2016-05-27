import styles from './style.postcss';

import React, { Component } from 'react';
import Table from '../Table';
import Reactable from 'reactable';
import ExpandedView from './ExpandedView';
import ExpandControl from './ExpandControl';

class Expandable extends Component {
  constructor(props) {
    super(props);
    this.state = { expandedRow: undefined, expandedHeight: undefined };
  }

  render() {
    const headers = this.props.columns.map((column) => this.renderHeader(column));
    let rows = this.props.data.map((row, index) => this.renderRow(row, index));
    rows = [].concat.apply([], rows);

    return <Table className={styles.ExpandTable}>
      <Reactable.Thead>
        {headers}
        <Reactable.Th column="expand"><span /></Reactable.Th>
        <Reactable.Th column="expanded" style={{ display: 'none' }}><span /></Reactable.Th>
      </Reactable.Thead>
      {rows}
    </Table>;
  }

  renderHeader(column) {
    return <Reactable.Th column={column.key} key={column.key}>
      <strong className={column.key}>{column.label}</strong>
    </Reactable.Th>;
  }

  renderRow(row, index) {
    if (index === this.state.expandedRow) {
      return [this.renderMasterRow(row, index), this.renderExpandedViewRow(row, index)];
    }

    return this.renderMasterRow(row, index);
  }

  renderMasterRow(row, index) {
    return <Reactable.Tr key={`${index}-master`}>
      {Object.keys(row).map((column) => this.renderCell(row, column))}
      <Reactable.Td column="expand" className={styles.ExpandTable_expandCell}>
        <ExpandControl className={styles.ExpandTable_expandCell_content}
            isOpen={this.state.expandedRow === index}
            onExpand={() => this.setState({ expandedRow: index })}
            onContract={() => this.setState({ expandedRow: undefined })} />
      </Reactable.Td>
      <Reactable.Td column="expanded" className={styles.ExpandTable_expandedCell}>
        <span />
      </Reactable.Td>
    </Reactable.Tr>;
  }

  renderExpandedViewRow(row, index) {
    const updateHeight = (height) => this.setState({ expandedHeight: height });
    return <Reactable.Tr key={`${index}-expanded`}
        className={styles.ExpandTable_expandedRow}>
      <Reactable.Td column="expanded">
        <div>
          <div className={styles.ExpandTable_expandedRow_content}>
            <ExpandedView onHeightChanged={updateHeight}>hey</ExpandedView>
          </div>
          <div style={{ height: this.state.expandedHeight }} />
        </div>
      </Reactable.Td>
    </Reactable.Tr>;
  }

  renderCell(row, column) {
    const value = row[column];
    return <Reactable.Td column={column} key={column}>{value}</Reactable.Td>;
  }
}

Expandable.propTypes = {
  data: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
};

export default Expandable;