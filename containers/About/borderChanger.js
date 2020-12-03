import styles from '@/styles/borderChanger';

export default function BorderChanger() {
    return (
        <>
            <style jsx>
                {styles}
            </style>
            <div className="container">
                <div className="border-changer"/>
            </div>
        </>
    );
}