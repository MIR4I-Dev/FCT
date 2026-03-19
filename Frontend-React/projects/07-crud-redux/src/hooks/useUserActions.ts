import { User, UserId, UserWithId, addNewUser, deleteUserById, editUser } from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
	const dispatch = useAppDispatch();

	const addUser = ({ name, email, github }: User) => {
		dispatch(addNewUser({ name, email, github }))
	}

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	const updateUser = (user: UserWithId) => {
		dispatch(editUser(user));
	};

	return { addUser, removeUser, updateUser };
};
