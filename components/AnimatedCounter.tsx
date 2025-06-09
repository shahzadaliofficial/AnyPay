'use client'
import CountUp from 'react-countup'
const AnimatedCounter = ({amount}:{amount:number}) => {
  return (
    <div>
        <CountUp className='w-full'
        // duration={4}
        decimals={2}
        decimal="."
        prefix='PKR '
        end={amount} 
        />
    </div>
  )
}

export default AnimatedCounter;