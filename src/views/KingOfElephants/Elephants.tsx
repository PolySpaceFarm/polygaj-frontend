import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BaseLayout, Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'

import { useForest } from 'hooks/useContract'
import useRefresh from 'hooks/useRefresh'
import { getAllForestData } from 'utils/forestUtils'
// import { useMatchBreakpoints } from '../../../../treedefi-uikit/src/hooks';
// import QuestionHelper from 'components/QuestionHelper'
import Hero from './components/Hero'
import TillCollapseCard from './components/TillCollapseCard'
import ParticipateCard from './components/ParticipateCard'
import LastEventsCard from './components/LastEventsCard'
import ActualKing from './components/ActualKing'

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 20px;
  margin-top: 20px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`
const BottomCardBody = styled(CardBody)`
  background-image: url(/images/forest/twines.png);
  background-position: top center;
  background-repeat: no-repeat;
  background-size: 100%;
`


// const QuesionHelperPositioner = styled.div`
//   margin-top: 10px;
//   margin-right: 10px;
//   float: right;
// `

const Forest = () => {
  const forestContract = useForest()
  const [forestData, setForestData] = useState(null)
  const { ultraRefresh } = useRefresh()
  // const { isXl } = useMatchBreakpoints();
  // const isMobile = isXl === false;
  // const marginForText = isMobile ? '40px' : '90px'
  const marginLeft = '10%'

  useEffect(() => {
    const allForestData = async () => {
      const data = await getAllForestData(forestContract)
      setForestData(data)
    }
    allForestData()
  }, [forestContract, ultraRefresh])

  return (
    <>
      <Hero />
      <Page>
        <TillCollapseCard
          hasWinner={forestData?.hasWinner}
          nextStartTime={forestData?.nextStartTime}
          lastBidTime={forestData?.lastBidTime}
          endOfAuction={forestData?.endOfAuction}
        />
        <Cards>
          <div>
            <ParticipateCard
              hasWinner={forestData?.hasWinner}
              nextStartTime={forestData?.nextStartTime}
              bidAmount={forestData?.bidAmount}
            />
          </div>
          <ActualKing lastBidder={forestData?.lastBidder} hasWinner={forestData?.hasWinner} />
        </Cards>
        <Card>
          <LastEventsCard />
        </Card>
        <Card mt="24px">
          <BottomCardBody>
            <Heading mt="50px" ml={marginLeft} mb="24px" size="xl">
              The King Of Elephants Game Rules
            </Heading>
            <Text ml={marginLeft} bold>
              How to Play?
            </Text>
            <Text ml={marginLeft} mb="20px">
              King of the Elephants has a 120 second countdown timer which resets on each bid.
            </Text>
            <Text ml={marginLeft} mb="20px">
              Bid is in GAJ and it goes into the Forest pool balance, allowing you to become the current king.
            </Text>
            <Text ml={marginLeft} mb="20px">
              When the timer reaches zero, the current king wins the game.
            </Text>
            <Text ml={marginLeft} mb="20px">
              Before another game can start one of the users has to press the restart game button.  <br />
              This resets the contract and refreshes the cooldown timer before a new game begins.
            </Text>
            <Text ml={marginLeft} bold>
              Winning’s distribution?
            </Text>
            <Text ml={marginLeft} mb="20px">
              When the countdown timer ends, Forest pool balance will be distributed as follows: <br />
              50% credited instantly to winner’s address (last bidder). <br />
              20% carries over to the next round. <br />
              30% is burned automatically. <br />
            </Text>
            <Text ml={marginLeft} mb="20px">
              Note: Anyone can click on the claim button but the winning share will go to the last bidder.
            </Text>
            <Text ml={marginLeft} mb="20px" color="red" bold>
              Important Note: All bids are final. Your GAJ cannot be returned after bidding.
            </Text>
          </BottomCardBody>
        </Card>
      </Page>
    </>
  )
}

export default Forest
