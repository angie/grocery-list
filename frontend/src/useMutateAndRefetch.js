import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const useMutateAndRefresh = (opts) => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data) => axios({ ...opts, data }), {
    onSuccess: async () => queryClient.invalidateQueries('items'),
  });
  return mutation;
};

export default useMutateAndRefresh;
