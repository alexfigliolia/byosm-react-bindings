import type { State } from "my-state";
import { useLayoutEffect, useState } from "react";

export const createUseState = <T extends State<any>>(state: T) => {
  return <S extends (state: T["state"]) => any>(selector: S) => {
    const [props, setProps] = useState<ReturnType<S>>(selector(state.state));

    useLayoutEffect(() => {
      const ID = state.subscribe((state) => {
        setProps(selector(state));
      });
      return () => {
        state.unsubscribe(ID);
      };
    }, []);

    return props;
  };
};
