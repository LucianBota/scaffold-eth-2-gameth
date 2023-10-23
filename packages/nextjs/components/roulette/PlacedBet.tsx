import { useEffect, useState } from "react";

const PlacedBet = (props: { value: number }) => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(animationKey + 1);
  }, [props.value]);

  return (
    <>
      {props.value ? (
        <>
          <div
            key={animationKey} // Change the key to trigger animation on updates
            className="absolute animate-ping-once bg-red-300 w-3 h-3 rounded-full"
          />
          <div
            className="absolute tooltip tooltip-bottom tooltip-info bg-red-600 w-3 h-3 rounded-full"
            data-tip={props.value.toFixed(4)}
          />
        </>
      ) : null}
    </>
  );
};

export default PlacedBet;
