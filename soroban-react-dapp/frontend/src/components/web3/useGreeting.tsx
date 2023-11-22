import * as SorobanClient from 'soroban-client';
import { SorobanContextType } from '@soroban-react/core';
import { useContractValue } from '@soroban-react/contracts'

import contract_ids from '../../../../src/contract_ids.json'


export function scvalToString(value: SorobanClient.xdr.ScVal): string | undefined {
  return value.value()?.toString();
}

interface useGreetingProps {
  sorobanContext: SorobanContextType
}


export function useGreeting({sorobanContext}: useGreetingProps){
      let fetchedGreeting_scval
      let fetchedGreeting 
      let isWrongConnection
      let currentChain = sorobanContext.activeChain?.name?.toLocaleLowerCase()
      
      fetchedGreeting_scval = useContractValue({ 
        contractAddress: (contract_ids as { [char: string]: {title_id:string} })[currentChain? currentChain: "standalone"]?.title_id,
        method: 'read_title',
        sorobanContext: sorobanContext
      })


      if(fetchedGreeting_scval.result){
        fetchedGreeting = fetchedGreeting_scval.result && scvalToString(fetchedGreeting_scval.result)?.replace("\u0000", "")
        isWrongConnection = false;
      }

      else {
        fetchedGreeting = ""
        isWrongConnection = true
      }

      return {isWrongConnection, fetchedGreeting}
      
}