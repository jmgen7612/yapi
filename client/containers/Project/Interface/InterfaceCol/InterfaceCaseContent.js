import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { fetchInterfaceColList, setColData, fetchCaseData } from '../../../../reducer/modules/interfaceCol'

@connect(
  state => {
    return {
      interfaceColList: state.interfaceCol.interfaceColList,
      currColId: state.interfaceCol.currColId,
      currCaseId: state.interfaceCol.currCaseId,
      currCase: state.interfaceCol.currCase,
      isShowCol: state.interfaceCol.isShowCol
    }
  },
  {
    fetchInterfaceColList,
    fetchCaseData,
    setColData
  }
)
@withRouter
export default class InterfaceCaseContent extends Component {

  static propTypes = {
    match: PropTypes.object,
    interfaceColList: PropTypes.array,
    fetchInterfaceColList: PropTypes.func,
    fetchCaseData: PropTypes.func,
    setColData: PropTypes.func,
    history: PropTypes.object,
    currColId: PropTypes.number,
    currCaseId: PropTypes.number,
    currCase: PropTypes.object,
    isShowCol: PropTypes.bool
  }

  constructor(props) {
    super(props)
  }

  async componentWillMount() {
    const result = await this.props.fetchInterfaceColList(this.props.match.params.id)
    let { currCaseId } = this.props;
    const params = this.props.match.params;
    const { actionId } = params;
    currCaseId = +actionId || +currCaseId || result.payload.data.data[0].caseList[0]._id;
    this.props.history.push('/project/' + params.id + '/interface/case/' + currCaseId)
    this.props.fetchCaseData(currCaseId)
    this.props.setColData({currCaseId: +currCaseId, isShowCol: false})
  }

  componentWillReceiveProps(nextProps) {
    const oldCaseId = this.props.match.params.actionId
    const newCaseId = nextProps.match.params.actionId
    if (oldCaseId !== newCaseId) {
      this.props.fetchCaseData(newCaseId);
      this.props.setColData({currCaseId: +newCaseId, isShowCol: false})
    }
  }

  render() {
    return (
      <div>
        <h1>hello caseContent</h1>
        {JSON.stringify(this.props.currCase, null, 2)}
      </div>
    )
  }
}
