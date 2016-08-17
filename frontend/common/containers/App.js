import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/counter'
import Counter from '../components/Counter'

const mapStateToProps = (state, props) => ({
  name: props.params.name,
  counter: state.counter[props.params.name] || 0,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
