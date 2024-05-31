import { useState } from 'react';
import { Card } from './Card';

function useContador() {
    const [count, setCount] = useState(0);

    const incrementar = () => {
        if (count === 10) return
        return setCount((count) => count + 1);
    }

    const decrementar = () => {
        if (count === 0) return
        return setCount((count) => count - 1);
    }

    return [count, incrementar, decrementar];
}

function Contador() {
    let [count, incrementar, decrementar] = useContador()

    return (
        <Card>
            <h3> El contador es {count}</h3>
            <div className='acciones' >
                <button onClick={incrementar}>+</button>
                <button onClick={decrementar}>-</button>
            </div>
        </Card>
    );
}

export { Contador };