import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import {List, ButtonGroup, Text, ListItem} from 'react-native-elements'

import { connect } from 'react-redux'
import { toggleTodo, setVisibilityFilter } from '../actions'

import {
    FlatList,
    StyleSheet,
    View,
    ScrollView
} from 'react-native';

class TodoList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedIndex: 0
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    /**
     * Filter todos
     * @param selectedIndex
     */
    updateIndex (selectedIndex) {
        const filter = [
            { index: 0, filter: "SHOW_ALL" },
            { index: 1, filter: "SHOW_ACTIVE" },
            { index: 2, filter: "SHOW_COMPLETED" }
        ].find(({ index, filter }) => index === selectedIndex).filter
        this.props.filterTodos(filter)
        this.setState({selectedIndex})
    }

    render() {
        let { todos, onTodoClick } = this.props
        const buttons = ['ALL', 'ACTIVE', 'COMPLETE']
        const { selectedIndex } = this.state
        return (
            <View>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                />
                <ScrollView>
                    <ListItem containerStyle={{ marginTop: 0 }}>
                        {
                            todos.map(todo => (
                                <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
                            ))
                        }
                    </ListItem>
                </ScrollView>
            </View>
        )
    }
}

const style = StyleSheet.create({
    list: {
        flex: 1,
        padding: 5
    }
});

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed)
        case 'SHOW_ALL':
        default:
            return todos
    }
}

/**
 * Redux: Map states to props
 * @param state
 */
const mapStateToProps = state => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

/**
 * Redux: Map actions to props
 * @param dispatch
 */
const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: id => {
            dispatch(toggleTodo(id))
        },
        filterTodos: filter => {
            dispatch(setVisibilityFilter(filter))
        }
    }
}

// Map props for TodoList
// const VisibleTodoList = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(TodoList)

// export default VisibleTodoList
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
