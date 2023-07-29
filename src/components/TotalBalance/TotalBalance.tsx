import React from 'react';

interface Props {
    total: number
}

const TotalBalance: React.FC<Props> = ({total}) => {
    return (
        <div className="container">
            <h4>Your Balance</h4>
            <h1 id="balance">{total} KGS</h1>
        </div>
    );
};

export default TotalBalance;