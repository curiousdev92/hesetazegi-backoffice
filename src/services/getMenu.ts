import { GET_MENU_URL } from "@src/utils/urls";
import { GET } from ".";

export const getMenu = async () => await GET(`${GET_MENU_URL}/fa`);
