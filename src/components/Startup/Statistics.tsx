import React from 'react'
import { PhoneAndroid } from '@mui/icons-material'
import androidPhone from '/src/assets/androidPhone.svg'
import cloud from '/src/assets/cloud.svg'
import personReading from '/src/assets/personReading.svg'
import personExplaining from '/src/assets/personExplaining.svg'

const stats = [
    {url: cloud, smallInfo: "Connects to the cloud, saving your profile and messages.", bigNumber: "10M", bigMsg: "gigabytes of data stored securely", id :"cloud"},
    {url: androidPhone, smallInfo: "Use any device, on the go and on the fly.", bigNumber: "All", bigMsg: "devices supported", id: "androidPhone"},
    {url: personReading, smallInfo: "Look at previous questions to see if your question has already been asked.", bigNumber: "67M", bigMsg: "posts available", id: "personReading"},
    {url: personExplaining, smallInfo: "Interact with millions of users to grow your reach.", bigNumber: "17M", bigMsg: "users online",id: "personStats"}
]

interface Props {
    imageUrl : string,
    smallInfo: string,
    bigNumber: string
    bigMsg: string
}

const Stat = ({ imageUrl, smallInfo, bigNumber, bigMsg } : Props) => (
    <div className='flex flex-col items-center text-xl text-[#5c5c5c] gap-4'>
        <div className='bg-[#faf1e2] flex justify-center w-full gap-4 p-4 shadow-xl'>
            <h3 className='text-[#38434f] flex flex-col justify-center'>
                <div className='flex justify-center'>
                    <h4 className='text-5xl font-bold'>{bigNumber}</h4>
                </div>
                <div className='text-2xl'>{bigMsg}</div>
            </h3>
            <img src={imageUrl} alt="Accompanying Statistic Image" className='h-32 w-32'/>
        </div>
        <h2>{smallInfo}</h2>
    </div>
)

const Statistics = () => {
  return (
    <div className='m-12 md:w-[40%] font-["Georgia"]'>
        <h3 className='text-[#333333] text-3xl mb-12'>Establish connections that will last a lifetime.</h3>
        <div className='grid grid-auto-fit gap-8'>
            {stats.map(({url, smallInfo, bigNumber, bigMsg, id}) => (
                <div key={id}>
                    <Stat imageUrl={url} smallInfo={smallInfo} bigNumber={bigNumber} bigMsg={bigMsg} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Statistics