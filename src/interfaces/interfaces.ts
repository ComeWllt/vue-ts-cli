export interface IProjectDetails {
  title: string;
  name: string;
  description: string;
  components: string[];
}

export interface IComponentsDetails {
  mapKey?: string;
  loginDependentComponents?: string[];
}
