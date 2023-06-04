import {
  DOMWidgetView,
  DOMWidgetModel,
  ISerializers,
  WidgetModel,
} from '@jupyter-widgets/base'
import { createRoot } from 'react-dom/client'

import { MODULE_NAME, MODULE_VERSION } from './version'

interface Props {
  greeting: string
}

const Example = ({ greeting }: Props) => {
  return <div>{greeting}</div>
}

export class ExampleModel extends DOMWidgetModel {
  defaults(): Backbone.ObjectHash {
    return {
      ...super.defaults(),
      _model_name: ExampleModel.model_name,
      _model_module: ExampleModel.model_module,
      _model_module_version: ExampleModel.model_module_version,
      _view_name: ExampleModel.view_name,
      _view_module: ExampleModel.view_module,
      _view_module_version: ExampleModel.view_module_version,
      greeting: 'Hello World',
    }
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  }

  static model_name = 'ExampleModel'
  static model_module = MODULE_NAME
  static model_module_version = MODULE_VERSION
  static view_name = 'ExampleView' // Set to null if no view
  static view_module = MODULE_NAME // Set to null if no view
  static view_module_version = MODULE_VERSION
}

export class ExampleView extends DOMWidgetView {
  constructor(opts: Backbone.ViewOptions<WidgetModel>) {
    super(opts)
    this.model.bind('greeting', this.render.bind(this))
  }

  render(): ExampleView {
    createRoot(this.el).render(
      <Example greeting={this.model.get('greeting')} />
    )
    return this
  }
}
