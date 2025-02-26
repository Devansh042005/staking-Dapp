import Wallet from './components/Wallet/Wallet'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import DisplayPanel from './components/DisplayPanel/DisplayPanel'
import TokenApproval from './components/StakeToken/TokenApproval'
import StakeAmount from './components/StakeToken/StakeAmount'

function App() {

  return (
    <>
      <Wallet>
        <Navigation/>
        <DisplayPanel/>
        <StakeAmount/>
        <TokenApproval/>
      </Wallet>
    </>
  )
}

export default App
