import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";

// .withTypes() requiere react-redux v9+ (RTK 2.x)
// Como usamos react-redux v8, usamos el patrón clásico con TypedUseSelectorHook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
