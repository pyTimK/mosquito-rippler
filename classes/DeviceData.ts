export interface DeviceData {
  is_measuring: boolean;
  user_id: string;
}

export const constructEmptyDeviceData = (): DeviceData => {
  return {
    is_measuring: false,
    user_id: "",
  } as DeviceData;
};
