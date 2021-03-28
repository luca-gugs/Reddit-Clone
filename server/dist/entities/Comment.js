"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Post_1 = require("./Post");
const User_1 = require("./User");
let Comment = class Comment extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.createdAt = new Date();
    }
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Comment.prototype, "creatorId", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User, user => user.comments),
    __metadata("design:type", User_1.User)
], Comment.prototype, "creator", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Comment.prototype, "postId", void 0);
__decorate([
    type_graphql_1.Field(() => Post_1.Post),
    typeorm_1.ManyToOne(() => Post_1.Post, post => post.comments, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Post_1.Post)
], Comment.prototype, "post", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Comment.prototype, "anon", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Object)
], Comment.prototype, "createdAt", void 0);
Comment = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map