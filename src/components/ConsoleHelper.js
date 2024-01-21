import React from 'react'
import { Hook, Console, Decode } from 'console-feed'

class ConsoleHelper extends React.Component {
  state = {
    logs: [
    ],
    filter: [],
    searchKeywords: '',
  }
  elementRef = React.createRef();


  getNumberStringWithWidth(num, width) {
    const str = num.toString()
    if (width > str.length) return '0'.repeat(width - str.length) + str
    return str.substr(0, width)
  }

  getTimestamp() {
    const date = new Date()
    const min = this.getNumberStringWithWidth(date.getMinutes(), 2)
    const sec = this.getNumberStringWithWidth(date.getSeconds(), 2)
    const ms = this.getNumberStringWithWidth(date.getMilliseconds(), 3)
    return `${min}:${sec}.${ms}`
  }

  spyOnConsole() {
    const iframe = this.props.iframeRef.current
    if(!iframe) return
    setTimeout(() => {
      Hook(
        (iframe.contentWindow).console,
        (log) => {
          const decoded = Decode(log)
          decoded.timestamp = this.getTimestamp()
          this.setState((state) => ({...state, logs: [...state.logs, decoded]}))
          const element = this.elementRef.current
          element.scrollTop = element.scrollHeight;
        },
        true,
        100
      )
    }, 100)
  }

  componentDidMount() {
    this.spyOnConsole()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.version !== this.props.version) {
      this.spyOnConsole()
    }
  }

  switch = () => {
    const filter = this.state.filter.length === 0 ? ['log'] : []
    this.setState({
      filter,
    })
  }

  handleKeywordsChange = ({ target: { value: searchKeywords } }) => {
    this.setState({ searchKeywords })
  }

  render() {
    return (
      <div
        ref={this.elementRef}
        style={{
          margin: '0',
          color: '#242424',
          background: 'var(--primary)',
          maxHeight: 100,
          overflow: 'auto',
          borderTop: '1px solid var(--secondary)',
          fontSize: 10,
          position: 'absolute',
          bottom: 0,
          right: 0, left: 0,
        }}
      >
        <Console
          logs={this.state.logs}
          variant={'dark'}
          filter={this.state.filter}
          searchKeywords={this.state.searchKeywords}
        />
      </div>
    )
  }
}

export default ConsoleHelper