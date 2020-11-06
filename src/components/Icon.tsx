import React from 'react';
// require 一个文件夹
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {importAll(require.context('assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}

type Props = {
  name?: string
}

const Icon = (props: Props) => {
  return (
      <svg className="icon">
        { props.name && <use xlinkHref={'#' + props.name } />}
      </svg>
  )
}

export default Icon