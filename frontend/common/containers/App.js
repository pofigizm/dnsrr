import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/counter'
import Counter from '../components/Counter'

const mapStateToProps = state => ({
  counter: state.counter,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
