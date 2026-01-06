import { TransactionDetailsProps } from '@/interfaces/transactionDetailsInterface'
import { useMemo } from 'react'

const TransactionDetails = ({ total, tokenName }: TransactionDetailsProps) => {
    const totalTokensAmount = useMemo(() => (total / (10 ** 18)).toFixed(2), [total])

    

    return (
        <div className='space-y-3'>
            <h2 className='text-[18px] font-bold'>Transaction Details</h2>
            <div className='flex justify-between'>
                <p className='text-gray-500'>Token Name</p>
                <p>{tokenName}</p>
            </div>
            <div className='flex justify-between'>
                <p className='text-gray-500'>Amount (in wei): </p>
                <p>{total}</p>
            </div>
            <div className='flex justify-between'>
                <p className='text-gray-500'>Amount (in tokens): </p>
                <p>{totalTokensAmount}</p>
            </div>
        </div>
    )
}

export default TransactionDetails