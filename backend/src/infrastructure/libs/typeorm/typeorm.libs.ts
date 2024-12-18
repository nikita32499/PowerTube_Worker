import {
    EntitySchema,
    EntitySchemaColumnOptions,
    EntitySchemaEmbeddedColumnOptions,
    EntitySchemaOptions,
} from 'typeorm';

export class TypeormLib {
    static BigIntConverter = class {
        to(data: number): number {
            return data;
        }

        from(data: string): number {
            return parseInt(data);
        }
    };

    static isAffectedSuccess<T extends { affected?: number | null | undefined }>(
        result: T,
    ): boolean {
        return typeof result.affected === 'number' && result.affected > 0 ? true : false;
    }

    static whereOptionMapper<T extends Record<string, any>>(
        obj: T,
    ): {
        [K in keyof T]: Exclude<T[K], null>;
    } {
        return Object.entries(obj).reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: value === null && typeof value === 'object' ? 0 : value,
            }),
            {} as any,
        );
    }
}

/*






*/

type SchemaColumnType<T> =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    T extends ArrayConstructor
        ? never
        : T extends object
          ? { type: 'jsonb' }
          : T extends string
            ? { type: 'text' | 'varchar' } | { type: 'enum'; enum: object }
            : T extends number
              ? { type: 'int' | 'bigint' }
              : T extends boolean
                ? {
                      type: 'boolean';
                  }
                : any;

export class EntitySchemaTyped<
    T,
    Embedds extends keyof T | '' = '',
> extends EntitySchema<T> {
    constructor(schema: SchemaTypeOrmVariant<T, Embedds>) {
        super(schema);
    }
}

type SchemaTypeOrmVariant<T, Embedds extends keyof T | '' = ''> = {
    columns: {
        [K in Exclude<keyof T, Embedds>]: SchemaColumnType<Exclude<T[K], null>> & {
            nullable: null extends T[K] ? true : false;
        } & EntitySchemaColumnOptions;
    };
} & (Embedds extends keyof T
    ? {
          embeddeds: {
              [K in Embedds]: (T[K] extends Array<infer El>
                  ? {
                        schema: EntitySchemaTyped<El>;
                        array: true;
                    }
                  : {
                        schema: EntitySchemaTyped<T[K]>;
                    }) &
                  EntitySchemaEmbeddedColumnOptions;
          };
      }
    : object) &
    EntitySchemaOptions<T>;
