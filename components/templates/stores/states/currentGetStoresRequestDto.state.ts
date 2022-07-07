import { atom } from "recoil";
import { GetStoresRequestDto } from "../../../../data/api";

const initGetStoresRequestDto: GetStoresRequestDto = {
  name: "",
  page: 1,
  rowsPerPage: 20,
};

export const currentGetStoresRequestDtoState = atom<GetStoresRequestDto>({
  key: "currentQueriesState",
  default: initGetStoresRequestDto,
});
