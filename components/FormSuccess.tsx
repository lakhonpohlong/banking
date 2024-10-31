import { CircleCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

interface FormSucessProps {
    message?: string;
    urlLabel?: string
    url?: string,
};

export const FormSuccess = ({ message, url, urlLabel }: FormSucessProps) => {
    if (!message) return null;

    return (
        <div className='bg-emerald-500/15 p-3 rounded-lg flex items-center gap-x-2 text-sm text-emerald-500'>
            <CircleCheck className='h-4 w-4' />
            <p>{message}</p>
            {url && (
                <Button size={'sm'} variant={'outline'} className='py-0 bg-green-400 text-white'>
                    <Link href={url}>{urlLabel}</Link>
                </Button>
            )}
        </div>
    )
}