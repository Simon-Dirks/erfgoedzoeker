export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  IRI: { input: unknown; output: unknown; }
};

export type BooleanBucket = {
  __typename?: 'BooleanBucket';
  count: Scalars['Int']['output'];
  value: Scalars['Boolean']['output'];
};

export type ContributorRole = {
  __typename?: 'ContributorRole';
  contributor?: Maybe<PersonReference>;
  role?: Maybe<Scalars['String']['output']>;
};

/** A condition on ContributorRole: the ids its entries reference, or a condition on one entry. */
export type ContributorRoleFilter = {
  in?: InputMaybe<Array<Scalars['IRI']['input']>>;
  where?: InputMaybe<ContributorRoleWhere>;
};

/** Sibling keys are combined with AND, and all of them must hold of the SAME entry. */
export type ContributorRoleWhere = {
  contributor?: InputMaybe<PersonFilter>;
  role?: InputMaybe<KeywordFilter>;
};

export type CreativeWork = {
  __typename?: 'CreativeWork';
  about: Array<TermReference>;
  abstract: Array<LanguageString>;
  additionalType: Array<TermReference>;
  associatedMedia: Array<MediaObject>;
  contentLocation: Array<PlaceReference>;
  contributor: Array<ContributorRole>;
  creator: Array<CreatorRole>;
  dataset?: Maybe<DatasetReference>;
  dateCreated?: Maybe<Scalars['String']['output']>;
  description: Array<LanguageString>;
  genre: Array<TermReference>;
  hasMedia: Scalars['Boolean']['output'];
  id: Scalars['IRI']['output'];
  identifier: Array<Scalars['String']['output']>;
  /** The work’s IIIF Presentation manifest, if it publishes one. Filled however the publisher states it – the profile’s own `associatedMedia` entry, or the `isBasedOn` target older versions used – so a IIIF-aware client dereferences this and never reads `associatedMedia` to find it. */
  iiifManifest?: Maybe<Scalars['String']['output']>;
  isPartOf: Array<DatasetReference>;
  locationCreated: Array<PlaceReference>;
  material: Array<TermReference>;
  name: Array<LanguageString>;
  sdDatePublished: Scalars['String']['output'];
  size: Array<LanguageString>;
  temporalCoverage: Array<Scalars['String']['output']>;
  text: Array<LanguageString>;
  type: Array<Scalars['String']['output']>;
};

/** A condition on exactly one field. Used inside `or`, where the criteria are alternatives. */
export type CreativeWorkCriterion = {
  about?: InputMaybe<TermFilter>;
  additionalType?: InputMaybe<TermFilter>;
  contentLocation?: InputMaybe<PlaceFilter>;
  contributor?: InputMaybe<ContributorRoleFilter>;
  creator?: InputMaybe<CreatorRoleFilter>;
  dataset?: InputMaybe<DatasetFilter>;
  dateCreated?: InputMaybe<DateRange>;
  genre?: InputMaybe<TermFilter>;
  hasMedia?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<CreativeWorkFilter>;
  identifier?: InputMaybe<KeywordFilter>;
  isPartOf?: InputMaybe<DatasetFilter>;
  license?: InputMaybe<IriFilter>;
  locationCreated?: InputMaybe<PlaceFilter>;
  material?: InputMaybe<TermFilter>;
  sdDatePublished?: InputMaybe<DateRange>;
  temporalCoverage?: InputMaybe<KeywordFilter>;
  type?: InputMaybe<KeywordFilter>;
};

export type CreativeWorkFacets = {
  __typename?: 'CreativeWorkFacets';
  about: Array<IriBucket>;
  additionalType: Array<IriBucket>;
  contentLocation: Array<IriBucket>;
  contributor: Array<IriBucket>;
  creator: Array<IriBucket>;
  dataset: Array<IriBucket>;
  genre: Array<IriBucket>;
  hasMedia: Array<BooleanBucket>;
  isPartOf: Array<IriBucket>;
  license: Array<IriBucket>;
  locationCreated: Array<IriBucket>;
  material: Array<IriBucket>;
  temporalCoverage: Array<ValueBucket>;
  type: Array<ValueBucket>;
};

/** Matches a field holding IRIs of CreativeWork. */
export type CreativeWorkFilter = {
  in?: InputMaybe<Array<Scalars['IRI']['input']>>;
};

export type CreativeWorkOrderBy = {
  direction?: SortDirection;
  field: CreativeWorkSortField;
};

export type CreativeWorkSearchResult = {
  __typename?: 'CreativeWorkSearchResult';
  facets: CreativeWorkFacets;
  items: Array<CreativeWork>;
  pagination: Pagination;
};

export enum CreativeWorkSortField {
  DateCreated = 'DATE_CREATED',
  Name = 'NAME',
  Relevance = 'RELEVANCE',
  SdDatePublished = 'SD_DATE_PUBLISHED'
}

/** Sibling keys are combined with AND. Use `or` for a disjunction, and `and` when a query needs more than one of them. */
export type CreativeWorkWhere = {
  about?: InputMaybe<TermFilter>;
  additionalType?: InputMaybe<TermFilter>;
  /** Further groups of conditions, all of which apply. The way to carry a second `or` disjunction alongside the first. */
  and?: InputMaybe<Array<CreativeWorkWhere>>;
  contentLocation?: InputMaybe<PlaceFilter>;
  contributor?: InputMaybe<ContributorRoleFilter>;
  creator?: InputMaybe<CreatorRoleFilter>;
  dataset?: InputMaybe<DatasetFilter>;
  dateCreated?: InputMaybe<DateRange>;
  genre?: InputMaybe<TermFilter>;
  hasMedia?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<CreativeWorkFilter>;
  identifier?: InputMaybe<KeywordFilter>;
  isPartOf?: InputMaybe<DatasetFilter>;
  license?: InputMaybe<IriFilter>;
  locationCreated?: InputMaybe<PlaceFilter>;
  material?: InputMaybe<TermFilter>;
  /** A disjunction: a document matches when ANY of these criteria holds. Combined with the sibling keys by AND, so it widens across fields without widening the query as a whole. */
  or?: InputMaybe<Array<CreativeWorkCriterion>>;
  sdDatePublished?: InputMaybe<DateRange>;
  temporalCoverage?: InputMaybe<KeywordFilter>;
  type?: InputMaybe<KeywordFilter>;
};

export type CreatorRole = {
  __typename?: 'CreatorRole';
  creator?: Maybe<PersonReference>;
  role?: Maybe<Scalars['String']['output']>;
};

/** A condition on CreatorRole: the ids its entries reference, or a condition on one entry. */
export type CreatorRoleFilter = {
  in?: InputMaybe<Array<Scalars['IRI']['input']>>;
  where?: InputMaybe<CreatorRoleWhere>;
};

/** Sibling keys are combined with AND, and all of them must hold of the SAME entry. */
export type CreatorRoleWhere = {
  creator?: InputMaybe<PersonFilter>;
  role?: InputMaybe<KeywordFilter>;
};

export type Dataset = {
  __typename?: 'Dataset';
  description: Array<LanguageString>;
  id: Scalars['IRI']['output'];
  landingPage?: Maybe<Scalars['String']['output']>;
  license: Array<Scalars['IRI']['output']>;
  /** The dataset’s display name, read from its `dcterms:title` in the register. Served as `name` like every other collection’s display field, so a client that renders a result never has to know which profile described it. */
  name: Array<LanguageString>;
  publisher: Array<PublisherReference>;
};

/** A condition on exactly one field. Used inside `or`, where the criteria are alternatives. */
export type DatasetCriterion = {
  id?: InputMaybe<DatasetFilter>;
  license?: InputMaybe<IriFilter>;
  publisher?: InputMaybe<PublisherFilter>;
};

export type DatasetFacets = {
  __typename?: 'DatasetFacets';
  license: Array<IriBucket>;
  publisher: Array<IriBucket>;
};

/** Matches a field holding IRIs of Dataset. */
export type DatasetFilter = {
  in?: InputMaybe<Array<Scalars['IRI']['input']>>;
};

export type DatasetOrderBy = {
  direction?: SortDirection;
  field: DatasetSortField;
};

export type DatasetReference = {
  __typename?: 'DatasetReference';
  description: Array<LanguageString>;
  id: Scalars['IRI']['output'];
  landingPage?: Maybe<Scalars['String']['output']>;
  license: Array<Scalars['IRI']['output']>;
  /** The dataset’s display name, read from its `dcterms:title` in the register. Served as `name` like every other collection’s display field, so a client that renders a result never has to know which profile described it. */
  name: Array<LanguageString>;
  publisher: Array<PublisherReference>;
};

export type DatasetSearchResult = {
  __typename?: 'DatasetSearchResult';
  facets: DatasetFacets;
  items: Array<Dataset>;
  pagination: Pagination;
};

export enum DatasetSortField {
  Name = 'NAME',
  Relevance = 'RELEVANCE'
}

/** Sibling keys are combined with AND. Use `or` for a disjunction, and `and` when a query needs more than one of them. */
export type DatasetWhere = {
  /** Further groups of conditions, all of which apply. The way to carry a second `or` disjunction alongside the first. */
  and?: InputMaybe<Array<DatasetWhere>>;
  id?: InputMaybe<DatasetFilter>;
  license?: InputMaybe<IriFilter>;
  /** A disjunction: a document matches when ANY of these criteria holds. Combined with the sibling keys by AND, so it widens across fields without widening the query as a whole. */
  or?: InputMaybe<Array<DatasetCriterion>>;
  publisher?: InputMaybe<PublisherFilter>;
};

export type DateRange = {
  max?: InputMaybe<Scalars['String']['input']>;
  min?: InputMaybe<Scalars['String']['input']>;
};

export type FloatRange = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
};

export type IriBucket = {
  __typename?: 'IRIBucket';
  count: Scalars['Int']['output'];
  label?: Maybe<Array<LanguageString>>;
  value: Scalars['IRI']['output'];
};

/** Matches a field holding IRIs that belong to no collection this API serves. */
export type IriFilter = {
  in?: InputMaybe<Array<Scalars['IRI']['input']>>;
};

/** Matches a field holding literal values. */
export type KeywordFilter = {
  in?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type LanguageString = {
  __typename?: 'LanguageString';
  language?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

export type MediaObject = {
  __typename?: 'MediaObject';
  contentUrl?: Maybe<Scalars['IRI']['output']>;
  copyrightNotice: Array<LanguageString>;
  encodingFormat: Array<Scalars['String']['output']>;
  license?: Maybe<Scalars['IRI']['output']>;
  thumbnailUrl?: Maybe<Scalars['IRI']['output']>;
};

export type Occupation = {
  __typename?: 'Occupation';
  dataset?: Maybe<DatasetReference>;
  id: Scalars['IRI']['output'];
  name: Array<LanguageString>;
};

/** A condition on exactly one field. Used inside `or`, where the criteria are alternatives. */
export type OccupationCriterion = {
  dataset?: InputMaybe<DatasetFilter>;
  id?: InputMaybe<OccupationFilter>;
};

export type OccupationFacets = {
  __typename?: 'OccupationFacets';
  dataset: Array<IriBucket>;
};

/** Matches a field holding IRIs of Occupation. */
export type OccupationFilter = {
  in?: InputMaybe<Array<Scalars['IRI']['input']>>;
};

export type OccupationOrderBy = {
  direction?: SortDirection;
  field: OccupationSortField;
};

export type OccupationReference = {
  __typename?: 'OccupationReference';
  dataset?: Maybe<DatasetReference>;
  id?: Maybe<Scalars['IRI']['output']>;
  name: Array<LanguageString>;
};

export type OccupationSearchResult = {
  __typename?: 'OccupationSearchResult';
  facets: OccupationFacets;
  items: Array<Occupation>;
  pagination: Pagination;
};

export enum OccupationSortField {
  Name = 'NAME',
  Relevance = 'RELEVANCE'
}

/** Sibling keys are combined with AND. Use `or` for a disjunction, and `and` when a query needs more than one of them. */
export type OccupationWhere = {
  /** Further groups of conditions, all of which apply. The way to carry a second `or` disjunction alongside the first. */
  and?: InputMaybe<Array<OccupationWhere>>;
  dataset?: InputMaybe<DatasetFilter>;
  id?: InputMaybe<OccupationFilter>;
  /** A disjunction: a document matches when ANY of these criteria holds. Combined with the sibling keys by AND, so it widens across fields without widening the query as a whole. */
  or?: InputMaybe<Array<OccupationCriterion>>;
};

export type Organization = {
  __typename?: 'Organization';
  dataset?: Maybe<DatasetReference>;
  id: Scalars['IRI']['output'];
  location: Array<PlaceReference>;
  name: Array<LanguageString>;
};

/** A condition on exactly one field. Used inside `or`, where the criteria are alternatives. */
export type OrganizationCriterion = {
  dataset?: InputMaybe<DatasetFilter>;
  id?: InputMaybe<OrganizationFilter>;
  location?: InputMaybe<PlaceFilter>;
};

export type OrganizationFacets = {
  __typename?: 'OrganizationFacets';
  dataset: Array<IriBucket>;
  location: Array<IriBucket>;
};

/** Matches a field holding IRIs of Organization. */
export type OrganizationFilter = {
  in?: InputMaybe<Array<Scalars['IRI']['input']>>;
};

export type OrganizationOrderBy = {
  direction?: SortDirection;
  field: OrganizationSortField;
};

export type OrganizationSearchResult = {
  __typename?: 'OrganizationSearchResult';
  facets: OrganizationFacets;
  items: Array<Organization>;
  pagination: Pagination;
};

export enum OrganizationSortField {
  Name = 'NAME',
  Relevance = 'RELEVANCE'
}

/** Sibling keys are combined with AND. Use `or` for a disjunction, and `and` when a query needs more than one of them. */
export type OrganizationWhere = {
  /** Further groups of conditions, all of which apply. The way to carry a second `or` disjunction alongside the first. */
  and?: InputMaybe<Array<OrganizationWhere>>;
  dataset?: InputMaybe<DatasetFilter>;
  id?: InputMaybe<OrganizationFilter>;
  location?: InputMaybe<PlaceFilter>;
  /** A disjunction: a document matches when ANY of these criteria holds. Combined with the sibling keys by AND, so it widens across fields without widening the query as a whole. */
  or?: InputMaybe<Array<OrganizationCriterion>>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Person = {
  __typename?: 'Person';
  alternateName: Array<LanguageString>;
  authority?: Maybe<Scalars['String']['output']>;
  birthDate?: Maybe<Scalars['String']['output']>;
  birthPlace: Array<PlaceReference>;
  deathDate?: Maybe<Scalars['String']['output']>;
  deathPlace: Array<PlaceReference>;
  fetchedAt?: Maybe<Scalars['String']['output']>;
  hasOccupation: Array<OccupationReference>;
  id: Scalars['IRI']['output'];
  name: Array<LanguageString>;
};

/** A condition on exactly one field. Used inside `or`, where the criteria are alternatives. */
export type PersonCriterion = {
  authority?: InputMaybe<KeywordFilter>;
  birthDate?: InputMaybe<DateRange>;
  birthPlace?: InputMaybe<PlaceFilter>;
  deathDate?: InputMaybe<DateRange>;
  deathPlace?: InputMaybe<PlaceFilter>;
  fetchedAt?: InputMaybe<DateRange>;
  hasOccupation?: InputMaybe<OccupationFilter>;
  id?: InputMaybe<PersonFilter>;
};

export type PersonFacets = {
  __typename?: 'PersonFacets';
  authority: Array<ValueBucket>;
  birthPlace: Array<IriBucket>;
  deathPlace: Array<IriBucket>;
};

/** Matches a field holding IRIs of Person. */
export type PersonFilter = {
  in?: InputMaybe<Array<Scalars['IRI']['input']>>;
};

export type PersonOrderBy = {
  direction?: SortDirection;
  field: PersonSortField;
};

export type PersonReference = {
  __typename?: 'PersonReference';
  alternateName: Array<LanguageString>;
  authority?: Maybe<Scalars['String']['output']>;
  birthDate?: Maybe<Scalars['String']['output']>;
  birthPlace: Array<PlaceReference>;
  deathDate?: Maybe<Scalars['String']['output']>;
  deathPlace: Array<PlaceReference>;
  fetchedAt?: Maybe<Scalars['String']['output']>;
  hasOccupation: Array<OccupationReference>;
  id?: Maybe<Scalars['IRI']['output']>;
  name: Array<LanguageString>;
};

export type PersonSearchResult = {
  __typename?: 'PersonSearchResult';
  facets: PersonFacets;
  items: Array<Person>;
  pagination: Pagination;
};

export enum PersonSortField {
  BirthDate = 'BIRTH_DATE',
  DeathDate = 'DEATH_DATE',
  FetchedAt = 'FETCHED_AT',
  Name = 'NAME',
  Relevance = 'RELEVANCE'
}

/** Sibling keys are combined with AND. Use `or` for a disjunction, and `and` when a query needs more than one of them. */
export type PersonWhere = {
  /** Further groups of conditions, all of which apply. The way to carry a second `or` disjunction alongside the first. */
  and?: InputMaybe<Array<PersonWhere>>;
  authority?: InputMaybe<KeywordFilter>;
  birthDate?: InputMaybe<DateRange>;
  birthPlace?: InputMaybe<PlaceFilter>;
  deathDate?: InputMaybe<DateRange>;
  deathPlace?: InputMaybe<PlaceFilter>;
  fetchedAt?: InputMaybe<DateRange>;
  hasOccupation?: InputMaybe<OccupationFilter>;
  id?: InputMaybe<PersonFilter>;
  /** A disjunction: a document matches when ANY of these criteria holds. Combined with the sibling keys by AND, so it widens across fields without widening the query as a whole. */
  or?: InputMaybe<Array<PersonCriterion>>;
};

export type Place = {
  __typename?: 'Place';
  addressCountry: Array<Scalars['String']['output']>;
  addressLocality: Array<Scalars['String']['output']>;
  addressRegion: Array<Scalars['String']['output']>;
  authority?: Maybe<Scalars['String']['output']>;
  fetchedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['IRI']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Array<LanguageString>;
  postalCode: Array<Scalars['String']['output']>;
  streetAddress: Array<Scalars['String']['output']>;
};

/** A condition on exactly one field. Used inside `or`, where the criteria are alternatives. */
export type PlaceCriterion = {
  addressCountry?: InputMaybe<KeywordFilter>;
  addressLocality?: InputMaybe<KeywordFilter>;
  addressRegion?: InputMaybe<KeywordFilter>;
  authority?: InputMaybe<KeywordFilter>;
  fetchedAt?: InputMaybe<DateRange>;
  id?: InputMaybe<PlaceFilter>;
  latitude?: InputMaybe<FloatRange>;
  longitude?: InputMaybe<FloatRange>;
  postalCode?: InputMaybe<KeywordFilter>;
  streetAddress?: InputMaybe<KeywordFilter>;
};

export type PlaceFacets = {
  __typename?: 'PlaceFacets';
  addressCountry: Array<ValueBucket>;
  addressLocality: Array<ValueBucket>;
  addressRegion: Array<ValueBucket>;
  authority: Array<ValueBucket>;
};

/** Matches a field holding IRIs of Place. */
export type PlaceFilter = {
  in?: InputMaybe<Array<Scalars['IRI']['input']>>;
};

export type PlaceOrderBy = {
  direction?: SortDirection;
  field: PlaceSortField;
};

export type PlaceReference = {
  __typename?: 'PlaceReference';
  addressCountry: Array<Scalars['String']['output']>;
  addressLocality: Array<Scalars['String']['output']>;
  addressRegion: Array<Scalars['String']['output']>;
  authority?: Maybe<Scalars['String']['output']>;
  fetchedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['IRI']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Array<LanguageString>;
  postalCode: Array<Scalars['String']['output']>;
  streetAddress: Array<Scalars['String']['output']>;
};

export type PlaceSearchResult = {
  __typename?: 'PlaceSearchResult';
  facets: PlaceFacets;
  items: Array<Place>;
  pagination: Pagination;
};

export enum PlaceSortField {
  FetchedAt = 'FETCHED_AT',
  Name = 'NAME',
  Relevance = 'RELEVANCE'
}

/** Sibling keys are combined with AND. Use `or` for a disjunction, and `and` when a query needs more than one of them. */
export type PlaceWhere = {
  addressCountry?: InputMaybe<KeywordFilter>;
  addressLocality?: InputMaybe<KeywordFilter>;
  addressRegion?: InputMaybe<KeywordFilter>;
  /** Further groups of conditions, all of which apply. The way to carry a second `or` disjunction alongside the first. */
  and?: InputMaybe<Array<PlaceWhere>>;
  authority?: InputMaybe<KeywordFilter>;
  fetchedAt?: InputMaybe<DateRange>;
  id?: InputMaybe<PlaceFilter>;
  latitude?: InputMaybe<FloatRange>;
  longitude?: InputMaybe<FloatRange>;
  /** A disjunction: a document matches when ANY of these criteria holds. Combined with the sibling keys by AND, so it widens across fields without widening the query as a whole. */
  or?: InputMaybe<Array<PlaceCriterion>>;
  postalCode?: InputMaybe<KeywordFilter>;
  streetAddress?: InputMaybe<KeywordFilter>;
};

export type Publisher = {
  __typename?: 'Publisher';
  id: Scalars['IRI']['output'];
  name: Array<LanguageString>;
};

/** A condition on exactly one field. Used inside `or`, where the criteria are alternatives. */
export type PublisherCriterion = {
  id?: InputMaybe<PublisherFilter>;
};

/** Matches a field holding IRIs of Publisher. */
export type PublisherFilter = {
  in?: InputMaybe<Array<Scalars['IRI']['input']>>;
};

export type PublisherOrderBy = {
  direction?: SortDirection;
  field: PublisherSortField;
};

export type PublisherReference = {
  __typename?: 'PublisherReference';
  id: Scalars['IRI']['output'];
  name: Array<LanguageString>;
};

export type PublisherSearchResult = {
  __typename?: 'PublisherSearchResult';
  items: Array<Publisher>;
  pagination: Pagination;
};

export enum PublisherSortField {
  Name = 'NAME',
  Relevance = 'RELEVANCE'
}

/** Sibling keys are combined with AND. Use `or` for a disjunction, and `and` when a query needs more than one of them. */
export type PublisherWhere = {
  /** Further groups of conditions, all of which apply. The way to carry a second `or` disjunction alongside the first. */
  and?: InputMaybe<Array<PublisherWhere>>;
  id?: InputMaybe<PublisherFilter>;
  /** A disjunction: a document matches when ANY of these criteria holds. Combined with the sibling keys by AND, so it widens across fields without widening the query as a whole. */
  or?: InputMaybe<Array<PublisherCriterion>>;
};

export type Query = {
  __typename?: 'Query';
  creativeWorks: CreativeWorkSearchResult;
  datasets: DatasetSearchResult;
  occupations: OccupationSearchResult;
  organizations: OrganizationSearchResult;
  persons: PersonSearchResult;
  places: PlaceSearchResult;
  publishers: PublisherSearchResult;
  terms: TermSearchResult;
};


export type QueryCreativeWorksArgs = {
  orderBy?: InputMaybe<CreativeWorkOrderBy>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<CreativeWorkWhere>;
};


export type QueryDatasetsArgs = {
  orderBy?: InputMaybe<DatasetOrderBy>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<DatasetWhere>;
};


export type QueryOccupationsArgs = {
  orderBy?: InputMaybe<OccupationOrderBy>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<OccupationWhere>;
};


export type QueryOrganizationsArgs = {
  orderBy?: InputMaybe<OrganizationOrderBy>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<OrganizationWhere>;
};


export type QueryPersonsArgs = {
  orderBy?: InputMaybe<PersonOrderBy>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PersonWhere>;
};


export type QueryPlacesArgs = {
  orderBy?: InputMaybe<PlaceOrderBy>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PlaceWhere>;
};


export type QueryPublishersArgs = {
  orderBy?: InputMaybe<PublisherOrderBy>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PublisherWhere>;
};


export type QueryTermsArgs = {
  orderBy?: InputMaybe<TermOrderBy>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<TermWhere>;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Term = {
  __typename?: 'Term';
  alternateName: Array<LanguageString>;
  authority?: Maybe<Scalars['String']['output']>;
  dataset?: Maybe<DatasetReference>;
  fetchedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['IRI']['output'];
  name: Array<LanguageString>;
  sameAs: Array<Scalars['String']['output']>;
};

/** A condition on exactly one field. Used inside `or`, where the criteria are alternatives. */
export type TermCriterion = {
  authority?: InputMaybe<KeywordFilter>;
  dataset?: InputMaybe<DatasetFilter>;
  fetchedAt?: InputMaybe<DateRange>;
  id?: InputMaybe<TermFilter>;
  sameAs?: InputMaybe<KeywordFilter>;
};

export type TermFacets = {
  __typename?: 'TermFacets';
  authority: Array<ValueBucket>;
  dataset: Array<IriBucket>;
  sameAs: Array<ValueBucket>;
};

/** Matches a field holding IRIs of Term. */
export type TermFilter = {
  in?: InputMaybe<Array<Scalars['IRI']['input']>>;
};

export type TermOrderBy = {
  direction?: SortDirection;
  field: TermSortField;
};

export type TermReference = {
  __typename?: 'TermReference';
  alternateName: Array<LanguageString>;
  authority?: Maybe<Scalars['String']['output']>;
  dataset?: Maybe<DatasetReference>;
  fetchedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['IRI']['output'];
  name: Array<LanguageString>;
  sameAs: Array<Scalars['String']['output']>;
};

export type TermSearchResult = {
  __typename?: 'TermSearchResult';
  facets: TermFacets;
  items: Array<Term>;
  pagination: Pagination;
};

export enum TermSortField {
  FetchedAt = 'FETCHED_AT',
  Name = 'NAME',
  Relevance = 'RELEVANCE'
}

/** Sibling keys are combined with AND. Use `or` for a disjunction, and `and` when a query needs more than one of them. */
export type TermWhere = {
  /** Further groups of conditions, all of which apply. The way to carry a second `or` disjunction alongside the first. */
  and?: InputMaybe<Array<TermWhere>>;
  authority?: InputMaybe<KeywordFilter>;
  dataset?: InputMaybe<DatasetFilter>;
  fetchedAt?: InputMaybe<DateRange>;
  id?: InputMaybe<TermFilter>;
  /** A disjunction: a document matches when ANY of these criteria holds. Combined with the sibling keys by AND, so it widens across fields without widening the query as a whole. */
  or?: InputMaybe<Array<TermCriterion>>;
  sameAs?: InputMaybe<KeywordFilter>;
};

export type ValueBucket = {
  __typename?: 'ValueBucket';
  count: Scalars['Int']['output'];
  label?: Maybe<Array<LanguageString>>;
  value: Scalars['String']['output'];
};
