import Wallet from './components/Wallet/Wallet'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import DisplayPanel from './components/DisplayPanel/DisplayPanel'
import TokenApproval from './components/StakeToken/TokenApproval'
import StakeAmount from './components/StakeToken/StakeAmount'
import WithdrawStakeAmount from './components/WithDraw/WithDraw'
import ClaimReward from './components/ClaimReward/ClaimReward'

function App() {

  return (
    <>
      <Wallet>
        <Navigation/>
        <DisplayPanel/>
        <StakeAmount/>
        <TokenApproval/>
        <WithdrawStakeAmount/>
        <ClaimReward/>
      </Wallet>
    </>
  )
}

export default App
